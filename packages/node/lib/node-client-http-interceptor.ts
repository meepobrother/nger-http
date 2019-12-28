import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, } from '@nger/http';
import { Injectable } from '@nger/core';
import { Observable } from 'rxjs';
import { NodeHttpRequest } from './node-http-request';
@Injectable()
export class NodeClientHttpInterceptor implements HttpInterceptor {
    constructor(public request: NodeHttpRequest) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let urlString: string = req.url;
        if (urlString.startsWith('http')) {
            return this.request.handle(req)
        }
        return next.handle(req);
    }
}
