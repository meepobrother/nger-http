import {
  HttpBackend,
  ROUTES,
  REQUEST,
  RESPONSE,
  REQUEST_ID,
  PRE_LOGGER_ID,
  LOGGER_LAST_TIME,
  HttpResponse,
  HttpHeaders,
  HttpEvent,
  HttpRequest,
  HttpParams,
} from "@nger/http";
import {
  Injector,
  isPromise,
  isObservable,
  Injectable,
  Logger
} from "@nger/core";
import { Observable } from "rxjs";
import UrlPattern from "url-pattern";
import { parse, ParsedQuery } from "query-string";
import { createURL, createCid } from "./util";
import { LoggerImpl } from "./logger";
import { parseurl } from './parseUrl'
@Injectable()
export class NodeHttpBackend extends HttpBackend {
  constructor(public injector: Injector) {
    super();
  }
  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const that = this;
    const url = parseurl(req.url)
    let query: any;
    if (typeof url.query === 'string') {
      query = parse(url.query || '', { arrayFormat: "comma" })
    } else {
      query = url.query || {};
    }
    let params = req.params || new HttpParams();
    Object.keys(query).map(key => {
      const val = Reflect.get(query, key);
      params = params.set(key, val);
    });
    req = req.clone({
      url: url.pathname || '',
      params
    });
    const res = new HttpResponse<any>({
      status: 200,
      statusText: "OK",
      url: req.url,
      headers: new HttpHeaders()
    });
    const headers = {};
    req.headers.forEach((name, value) => {
      Reflect.set(headers, name, value);
    });
    return new Observable(obser => {
      const routes = that.injector.get(ROUTES, []);
      routes &&
        routes.map(route => {
          if (route.method === req.method || route.method === "ALL") {
            const match = route.match(req.url)
            if (match) {
              const result = route.handleRequest([{
                provide: Logger,
                useClass: LoggerImpl,
                deps: [Injector]
              }, {
                provide: REQUEST,
                useValue: req
              },
              {
                provide: RESPONSE,
                useValue: res
              },
              {
                provide: PRE_LOGGER_ID,
                useValue: req.headers.get("pre-logger-id") || ""
              },
              {
                provide: LOGGER_LAST_TIME,
                useValue: req.headers.get("logger-last-time") || new Date().getTime()
              },
              {
                provide: REQUEST_ID,
                useFactory: () => req.headers.get("request-id") || createCid(
                  JSON.stringify({
                    body: req.body,
                    params: req.toString(),
                    url: req.url,
                    headers: headers
                  })
                )
              }])
              handlerResult(result, obser, res, true);
            }
          }
        });
      obser.next(
        res.clone({
          status: 404,
          statusText: "this function is developing..., please waite a minute!"
        })
      );
      obser.complete();
    });
  }
}

function getPath(path: string) {
  if (path.endsWith("/")) {
    const paths = path.split("/");
    paths.pop();
    return paths.length > 0 ? paths.join("/") : "/";
  }
  return path;
}

function handlerResult(
  r: any,
  obs: any,
  response: HttpResponse<any>,
  isStart: boolean
) {
  if (isPromise(r)) {
    r.then(it => {
      handlerResult(it, obs, response, false);
    }).finally(() => obs.complete());
  } else if (isObservable(r)) {
    r.subscribe(
      it => handlerResult(it, obs, response, false),
      err => obs.error(err),
      () => obs.complete()
    );
  } else if (
    typeof r === "string" ||
    typeof r === "number" ||
    typeof r === "boolean" ||
    typeof r === "symbol"
  ) {
    const headers = new HttpHeaders();
    headers.set("content-type", "text/html");
    obs.next(
      response.clone({
        headers,
        body: r
      })
    );
    if (isStart) {
      obs.complete();
    }
  } else if (Array.isArray(r) || typeof r === "object") {
    const headers = new HttpHeaders();
    headers.set("content-type", "application/json; charset=utf-8");
    obs.next(
      response.clone({
        headers,
        body: r
      })
    );
    if (isStart) {
      obs.complete();
    }
  } else if (isIterator(r)) {
    const next = r.return && r.return();
    if (next) {
      handlerResult(next.value, obs, response, false);
      if (next.done) {
        obs.complete();
      } else {
        handlerResult(r.next(), obs, response, false);
      }
    }
  }
}

export function isIterator(val: any): val is Iterator<any> {
  return val && typeof val.next === "function";
}
