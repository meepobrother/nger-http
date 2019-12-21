import { HttpBackend, HttpEvent, HttpRequest, HttpParams } from "@nger/http";
import { Observable } from 'rxjs';
import UrlPattern from 'url-pattern';
export class NodeClientHttpBackend extends HttpBackend {
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
        return new Observable((obser) => {
            new UrlPattern(`${url.origin}${paramsStr}`)
        })
    }
}
