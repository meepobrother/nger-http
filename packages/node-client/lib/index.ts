import { Module } from '@nger/core';
import { HttpBackend, HttpClientModule } from '@nger/http';
import { NodeClientHttpBackend } from './httpHandler';

@Module({
    imports: [
        HttpClientModule
    ],
    providers: [{
        provide: HttpBackend,
        useClass: NodeClientHttpBackend
    }]
})
export class NodeClientHttpModule { }
