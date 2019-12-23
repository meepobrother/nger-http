import { HttpClient } from '@nger/http';
import { corePlatform, Module, } from '@nger/core';
import { writeFileSync } from 'fs';
import { NodeClientHttpModule } from '../lib'
import { join } from 'path';
@Module({
    imports: [
        NodeClientHttpModule
    ],
    providers: []
})
export class AppModule { }

corePlatform().bootstrapModule(AppModule).then(res => {
    const client = res.get(HttpClient)
    client.get(`http://baidu.com`, {
        params: {
            name: 'imeepos'
        },
        headers: {
            [`accept`]: `text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
            [`User-Agent`]: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36`
        }
    }).subscribe(res => {
        writeFileSync(join(__dirname, `index.html`), res)
        debugger
    })
})
