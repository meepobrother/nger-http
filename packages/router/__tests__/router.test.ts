import { Module, corePlatform } from '@nger/core'
import { RouterModule } from '../lib'
@Module({
    imports: [
        RouterModule.forRoot([{
            path: ''
        }])
    ]
})
export class AppModule { }

corePlatform().bootstrapModule(AppModule).then(res => {
    debugger;
})
