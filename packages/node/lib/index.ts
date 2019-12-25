import { Module, ModuleWithProviders, Injector } from '@nger/core';
import { HTTP_INTERCEPTORS, HttpBackend } from '@nger/http';
import { NodeClientHttpInterceptor } from './node-client-http-interceptor';
import { NodeHttpBackend } from './node-http-backend';
@Module()
export class HttpNodeModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: HttpNodeModule,
            providers: [{
                provide: HttpBackend,
                useClass: NodeHttpBackend,
                deps: [Injector]
            }, {
                provide: HTTP_INTERCEPTORS,
                useClass: NodeClientHttpInterceptor,
                multi: true
            }]
        }
    }
}