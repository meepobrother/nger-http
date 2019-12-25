import { HttpClient, HttpModule } from '@nger/http';
import { corePlatform, Module, Query } from '@nger/core';
import { writeFileSync } from 'fs';
import { HttpNodeModule } from '../lib'
import { join } from 'path';

import { Controller, Get } from '@nger/core'

@Controller()
export class DemoController {
    @Get(``)
    getHome() {
        return `welcome to nger home!`
    }

    @Get(`user`)
    getUser(@Query(`id`) id: number) {
        return `welcome to user home! ${id}`
    }
}
@Module({
    imports: [
        HttpNodeModule,
        HttpModule
    ],
    providers: [],
    controllers: [DemoController]
})
export class AppModule { }

corePlatform().bootstrapModule(AppModule).then(res => {
    const client = res.get(HttpClient)
    client.get(`http://baidu.com/user?id=2`, {
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
