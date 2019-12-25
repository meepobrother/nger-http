import { Injectable, Injector, NgModule, HttpRequest, HttpEvent } from '@nger/core';
import { Observable } from 'rxjs';
import { HttpBackend, HttpHandler } from './backend';
import { HttpClient } from './client';
import { HTTP_INTERCEPTORS, NoopInterceptor, HttpInterceptorHandler } from './interceptor';
import { handlers } from './handlers';
@Injectable()
export class HttpInterceptingHandler implements HttpHandler {
    private chain: HttpHandler | null = null;
    constructor(private backend: HttpBackend, private injector: Injector) { }
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        if (this.chain === null) {
            const interceptors = this.injector.get(HTTP_INTERCEPTORS, []);
            this.chain = interceptors.reduceRight(
                (next, interceptor) => new HttpInterceptorHandler(next, interceptor), this.backend);
        }
        return this.chain.handle(req);
    }
}

@NgModule({
    providers: [
        ...handlers,
        HttpClient,
        { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
        { provide: HttpHandler, useClass: HttpInterceptingHandler }
    ]
})
export class HttpModule { }
