import { HttpBackend, ROUTES, REQUEST, RESPONSE } from "@nger/http";
import {
    HttpEvent, HttpRequest, HttpParams, Injector, HttpResponse,
    HttpHeaders, isPromise, isObservable, Injectable
} from '@nger/core'
import { Observable } from 'rxjs';
import UrlPattern from 'url-pattern';
import { parse, ParsedQuery } from 'query-string';
import { createURL } from "./util";
@Injectable()
export class NodeHttpBackend extends HttpBackend {
    constructor(public injector: Injector) {
        super();
    }
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        const that = this;
        let headers: any = {};
        req.headers.forEach((name, value) => {
            Reflect.set(headers, name, value.length === 1 ? value[0] : value)
        });
        let options: ParsedQuery = {}
        let urlString: string = req.url;
        if (urlString.startsWith('http')) {
            const splits = urlString.split(`?`)
            const str = splits.pop();
            options = parse(str!, { arrayFormat: 'comma' });
        }
        else if (urlString.startsWith('/')) {
            const splits = urlString.split(`?`)
            const str = splits.pop()
            options = parse(str!, { arrayFormat: 'comma' });
        }
        else if (urlString.startsWith('./')) {
            const splits = urlString.split(`?`)
            const str = splits.pop()
            options = parse(str!, { arrayFormat: 'comma' });
        }
        else {
            const splits = urlString.split(`?`)
            const str = splits.pop()
            options = parse(str!, { arrayFormat: 'comma' });
        }
        let params = req.params || new HttpParams();
        Object.keys(options).map(key => {
            const val = Reflect.get(options, key)
            params = params.set(key, val)
        });
        req = req.clone({
            params
        });
        const res = new HttpResponse<any>({
            status: 200,
            statusText: "OK",
            url: req.url,
            headers: headers
        });
        this.injector.getInjector('root').setStatic([{
            provide: REQUEST,
            useValue: req
        }, {
            provide: RESPONSE,
            useValue: res
        }])
        let _uri: URL = createURL(urlString);
        const pathname = _uri.pathname;
        return new Observable((obser) => {
            const routes = that.injector.get(ROUTES)
            routes && routes.map(route => {
                if (route.method === req.method || route.method === 'ALL') {
                    const urlPattern = new UrlPattern(route.path)
                    const path = urlPattern.match(`${getPath(pathname)}`);
                    if (path) {
                        const r = route.factory();
                        handlerResult(r, obser, res, true)
                    }
                }
            })
            obser.next(res.clone({
                status: 404,
                statusText: 'NOT FOUND'
            }));
            obser.complete();
        });
    }
}

function getPath(path: string) {
    if (path.endsWith('/')) {
        const paths = path.split('/')
        paths.pop();
        return paths.length > 0 ? paths.join('/') : '/'
    }
    return path;
}

function handlerResult(r: any, obs: any, response: HttpResponse<any>, isStart: boolean) {
    if (isPromise(r)) {
        r.then(it => {
            handlerResult(it, obs, response, false)
        }).finally(() => obs.complete())
    }
    else if (isObservable(r)) {
        r.subscribe(it => handlerResult(it, obs, response, false), err => obs.error(err), () => obs.complete())
    }
    else if (typeof r === 'string' || typeof r === 'number' || typeof r === 'boolean' || typeof r === 'symbol') {
        const headers = new HttpHeaders();
        headers.set('content-type', 'text/html');
        obs.next(response.clone({
            headers,
            body: r
        }));
        if (isStart) {
            obs.complete();
        }
    }
    else if (Array.isArray(r) || typeof r === 'object') {
        const headers = new HttpHeaders();
        headers.set('content-type', 'application/json; charset=utf-8');
        obs.next(response.clone({
            headers,
            body: r
        }));
        if (isStart) {
            obs.complete();
        }
    } else if (isIterator(r)) {
        const next = r.return && r.return()
        if (next) {
            handlerResult(next.value, obs, response, false)
            if (next.done) {
                obs.complete();
            } else {
                handlerResult(r.next(), obs, response, false)
            }
        }
    }
}

export function isIterator(val: any): val is Iterator<any> {
    return val && typeof val.next === 'function'
}