import { StaticProvider, MethodHandler, Injector, CanLoad } from "@nger/core";
import { PostMetadataKey, PostOptions } from "../../decorator";
import { IMethodDecorator } from '@nger/decorator'
import { ROUTES } from "../../token";
import { Layer } from "../../layer";
const handler: MethodHandler = (handler: Function, instance: any, injector: Injector, parameter: IMethodDecorator<any, PostOptions>) => {
    const options = parameter.options
    if (options) {
        let useGuards: CanLoad[] = []
        if (options.useGuards) {
            useGuards = options.useGuards.map(guard => injector.get<CanLoad>(guard));
        }
        injector.setStatic([{
            provide: ROUTES,
            useValue: new Layer(`POST`, options.path, {}, handler, useGuards),
            multi: true
        }])
    }
}
export const postHandler: StaticProvider = {
    provide: PostMetadataKey,
    useValue: handler
}