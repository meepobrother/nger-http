import { Module, Injector } from '@nger/core';
import { HttpModule, HttpBackend } from '@nger/http';
import { NodeServerHttpBackend } from './httpHandler'
@Module({
    providers: [{
        provide: HttpBackend,
        useFactory: (injector: Injector) => new NodeServerHttpBackend(injector),
        deps: [Injector]
    }],
    imports: [
        HttpModule
    ],
    exports: [
        HttpModule
    ]
})
export class NodeServerHttpModule {

}