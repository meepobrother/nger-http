import { Module } from '@nger/core';
import { HttpBackend, HttpModule } from '@nger/http';
import { NodeClientHttpBackend } from './httpHandler';

@Module({
    imports: [
        HttpModule
    ],
    providers: [{
        provide: HttpBackend,
        useClass: NodeClientHttpBackend
    }],
    exports: [
        HttpModule
    ]
})
export class NodeClientHttpModule { }
