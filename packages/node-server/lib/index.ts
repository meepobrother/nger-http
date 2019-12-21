import { Module } from '@nger/core';
import { HttpClientModule } from '@nger/http';
@Module({
    providers: [],
    imports: [
        HttpClientModule
    ]
})
export class NodeServerModule {

}