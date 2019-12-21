import { HttpHandler, HttpEvent, HttpRequest, HttpHeaders, HttpResponse, HttpJsonParseError } from "@nger/http";
import { Observable } from 'rxjs';
import request, { Response } from 'request';
import { parse } from 'content-type';
const XSSI_PREFIX = /^\)\]\}',?\n/;
export class NodeHttpHandler extends HttpHandler {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let headers: any = {};
        req.headers.forEach((name, value) => {
            Reflect.set(headers, name, value.length === 1 ? value[0] : value)
        });
        return new Observable((obser) => {
            request(req.url, {
                method: req.method,
                headers: headers,
                body: req.body,
                gzip: true
            }, (err: Error, res: Response, body: any) => {
                if (err) obser.error(err);
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
