import { Module } from '@nger/core';
import { HttpHandler, HttpClientModule } from '@nger/http';
import { NodeHttpHandler } from './httpHandler';

@Module({
    imports: [
        HttpClientModule
    ],
    providers: [{
        provide: HttpHandler,
        useClass: NodeHttpHandler
    }]
})
export class NodeHttpModule { }
