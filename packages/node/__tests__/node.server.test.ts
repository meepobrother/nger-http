import { PLATFORM_NAME } from '@nger/core';
import { HttpClient, HttpModule, Query, Get } from '@nger/http';
import { corePlatform, Module, Controller, Injector, Logger } from '@nger/core';
import { writeFileSync } from 'fs';
import { HttpNodeModule } from '../lib'
import { join } from 'path';

@Controller()
export class DemoController {
    constructor(private injector: Injector) { }
    @Get(``)
    getHome() {
        return `welcome to nger home!`
    }
    @Get(`user`)
    getUser(@Query(`id`) id: number, @Query(`name`) name: string) {
        const logger = this.injector.get(Logger)
        return logger.info(`welcome to user home! ${id}-${name}`)
    }
}

@Module({
    providers: [],
    controllers: [
        DemoController
    ]
})
export class DemoModule { }

@Module({
    imports: [
        HttpNodeModule,
        HttpModule,
        DemoModule
    ],
    providers: [{
        provide: PLATFORM_NAME,
        useValue: 'demo'
    }],
    controllers: []
})
export class AppModule { }
corePlatform().bootstrapModule(AppModule).then(res => {
    const ref = res.getModuleRef(DemoModule);
    const client = ref.get(HttpClient);
    client.get(`./user?id=2`, {
        params: {
            name: 'imeepos'
        }
    }).subscribe(res => {
        writeFileSync(join(__dirname, `index.html`), res)
        debugger
    })
})
