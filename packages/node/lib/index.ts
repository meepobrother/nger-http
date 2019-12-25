import { Module, Injector } from '@nger/core';
import { HTTP_INTERCEPTORS, HttpBackend } from '@nger/http';
import { NodeClientHttpInterceptor } from './node-client-http-interceptor';
import { NodeHttpBackend } from './node-http-backend';
import { NodeHttpRequest } from './node-http-request';
@Module({
    providers: [
        NodeHttpRequest,
        {
            provide: HttpBackend,
            useFactory: (injector: Injector) => new NodeHttpBackend(injector),
            deps: [Injector]
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: NodeClientHttpInterceptor,
            multi: true
        }
    ],
})
export class HttpNodeModule { }