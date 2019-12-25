import { HttpClient, HttpModule, Query, Get } from '@nger/http';
import { corePlatform, Module, Controller } from '@nger/core';
import { writeFileSync } from 'fs';
import { HttpNodeModule } from '../lib'
import { join } from 'path';

@Controller()
export class DemoController {
    @Get(``)
    getHome() {
        return `welcome to nger home!`
    }
    @Get(`user`)
    getUser(@Query(`id`) id: number, @Query(`name`) name: string) {
        return `welcome to user home! ${id}-${name}`
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
    client.get(`./user?id=2`, {
        params: {
            name: 'imeepos'
        }
    }).subscribe(res => {
        writeFileSync(join(__dirname, `index.html`), res)
        debugger
    })
})
