import { COOKIE_SECRET, CURRENT_SECRET } from "@nger/http";
import { Injectable, Injector } from "@nger/core";
import { unsign, sign } from "cookie-signature";
import { parse, CookieParseOptions, serialize } from "cookie";
@Injectable()
export class CookieService {
  private _secret: string[];
  constructor(public injector: Injector) {}
  get secrets(): string[] {
    if (this._secret) return this._secret;
    this._secret = this.injector.get(COOKIE_SECRET, null);
    return this._secret;
  }
  get currentSecret() {
    return this.injector.get(CURRENT_SECRET, null);
  }
  parse<T>(val: string, options?: CookieParseOptions): T {
    const cookie = parse(val, options);
    const secrets = this.secrets;
    if (secrets && secrets.length > 0) {
      const signed = this._signedCookies(cookie, secrets);
      return this._JSONCookies({
        ...cookie,
        ...signed
      });
    }
    return this._JSONCookies(cookie);
  }

  serialize(obj: any) {
    let secrets = this.currentSecret;
    const keys = Object.keys(obj);
    return keys
      .map((key: string) => {
        const val = Reflect.get(obj, key);
        return serialize(key, secrets ? `s:${sign(val, secrets)}` : val);
      })
      .join(";");
  }

  private _JSONCookie(str: string) {
    if (typeof str !== "string" || str.substr(0, 2) !== "j:") {
      return undefined;
    }
    try {
      return JSON.parse(str.slice(2));
    } catch (err) {
      return undefined;
    }
  }

  private _JSONCookies<T>(obj: any): T {
    const cookies = Object.keys(obj);
    let key: any;
    let val: any;
    for (let i = 0; i < cookies.length; i++) {
      key = cookies[i];
      val = this._JSONCookie(obj[key]);
      if (val) {
        obj[key] = val;
      }
    }
    return obj;
  }

  private _signedCookies(
    obj: { [key: string]: string },
    secret: string | string[]
  ) {
    const cookies = Object.keys(obj);
    const ret = {};
    cookies.map(key => {
      const val = Reflect.get(obj, key);
      const dec = this._signedCookie(val, secret);
      if (val !== dec) {
        Reflect.set(ret, key, dec);
        delete obj[key];
      }
    });
    return ret;
  }

  private _signedCookie(
    str: string,
    secret: string | string[]
  ): string | false | undefined {
    if (typeof str !== "string") {
      return undefined;
    }
    if (str.substr(0, 2) !== "s:") {
      return str;
    }
    const secrets: string[] = [];
    if (Array.isArray(secret)) {
      secrets.push(...secret);
    } else {
      secrets.push(secret);
    }
    for (let i = 0; i < secrets.length; i++) {
      const val = unsign(str.slice(2), secrets[i]);
      if (val !== false) {
        return val;
      }
    }
    return false;
  }
}
