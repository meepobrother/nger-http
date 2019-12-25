import { HttpInterceptor, HttpHandler } from '@nger/http';
import { HttpRequest, HttpEvent } from '@nger/core';
import { Observable } from 'rxjs';
import { NodeHttpRequest } from './node-http-request';

export class NodeClientHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let urlString: string = req.url;
        if (urlString.startsWith('http')) {
            return new NodeHttpRequest().handle(req)
        }
        return next.handle(req);
    }
}
