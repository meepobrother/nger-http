import { HttpClient, HttpModule, Query, Get } from '@nger/http';
import { PLATFORM_NAME, corePlatform, Module, Controller, Injector, Logger, Injectable } from '@nger/core';
import { writeFileSync } from 'fs';
import { HttpNodeModule } from '../lib'
import { join } from 'path';

@Injectable()
export class DemoService {
    public logger: Logger
    constructor(private injector: Injector) {
        debugger;
        this.logger = this.injector.get(Logger)
    }
}

@Controller({
    path: `/`,
    providers: [
        DemoService
    ]
})
export class DemoController {
    constructor(private injector: Injector, private logger: Logger) { }
    @Get(``)
    getHome() {
        return `welcome to nger home!`
    }
    @Get(`user`)
    getUser(@Query(`id`) id: number, @Query(`name`) name: string) {
        const logger = this.logger
        debugger;
        return logger.info(`welcome to user home! ${id}-${name}`)
    }
}

@Module({
    imports: [],
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
        useValue: 'BasicPlatform'
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
        },
        headers: {
            [`pre-logger-id`]: "20b7a5b89cc4a7d791e0845125a9ce63",
            [`logger-last-time`]: `${new Date().getTime()}`
        }
    }).subscribe(res => {
        writeFileSync(join(__dirname, `index.html`), res)
        debugger
    })
})
