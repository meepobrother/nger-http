import { HttpModule, Query, Get } from '@nger/http';
import { corePlatform, Module, Controller } from '@nger/core';
import { HttpExpressModule } from '../lib'
import { HttpNodeModule } from '@nger/http-node';

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
        HttpExpressModule,
        HttpNodeModule,
        HttpModule
    ],
    providers: [],
    controllers: [DemoController]
})
export class AppModule { }
corePlatform().bootstrapModule(AppModule).then(res => { })
