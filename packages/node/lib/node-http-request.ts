import { HttpBackend, } from "@nger/http";
import { HttpEvent, HttpRequest, HttpHeaders, HttpResponse, HttpJsonParseError, HttpParams } from '@nger/core';
import { Observable } from 'rxjs';
import request, { Response } from 'request';
import { parse } from 'content-type';
const XSSI_PREFIX = /^\)\]\}',?\n/;
export class NodeHttpRequest extends HttpBackend {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let headers: any = {};
        req.headers.forEach((name, value) => {
            Reflect.set(headers, name, value.length === 1 ? value[0] : value)
        });
        let url = new URL(req.url);
        let params = req.params || new HttpParams();
        if (url.searchParams) {
            url.searchParams.forEach((value, key) => {
                params = params.set(key, value)
            });
        }
        const paramsStr = params.toString();
        const _url = `${url.protocol}//${url.username ? `${url.username}:${url.password}@` : ''}${url.hostname}:${url.port}${url.pathname}?${paramsStr}${url.hash ? `#${url.hash}` : ""}`;
        return new Observable((obser) => {
            request({
                url: _url,
                host: url.host,
                port: parseInt(url.port),
                method: req.method,
                headers: headers,
                body: req.body,
                gzip: true,
            }, (err: Error, res: Response, body: any) => {
                if (err) return obser.error(err);
                const headers = res.headers;
                let responseType = req.responseType;
                if (headers[`content-type`]) {
                    const media = parse(res);
                    switch (media.type) {
                        case "text/html":
                        case "text/xml":
                        case "text/css":
                        case "application/javascript":
                        case "text/markdown":
                            responseType = 'text';
                            break;
                        case "text/plain":
                            responseType = 'json';
                            break;
                        case "font/woff2":
                            responseType = "blob";
                            break;
                        case "application/octet-stream":
                            responseType = 'arraybuffer';
                            break;
                        default:
                            console.log(`unhandle ${media.type}`)
                            break;
                    }
                }
                const status = res.statusCode;
                let ok = status >= 200 && status < 300;
                if (responseType === 'json' && typeof body === 'string') {
                    const originalBody = body;
                    body = body.replace(XSSI_PREFIX, '');
                    try {
                        body = body !== '' ? JSON.parse(body) : null;
                    } catch (error) {
                        body = originalBody;
                        if (ok) {
                            ok = false;
                            body = { error, text: body } as HttpJsonParseError;
                        }
                    }
                }
                const response = new HttpResponse({
                    status: res.statusCode,
                    statusText: res.statusMessage,
                    headers: new HttpHeaders(res.headers as any),
                    url: res.url,
                    body: body
                });
                obser.next(response)
            });
        })
    }
}
