import { StaticProvider, Injector, CanLoad } from "@nger/core";
import { HeadMetadataKey, HeadOptions } from "../../decorator";
import { IMethodDecorator } from '@nger/decorator'
import { ROUTES } from "../../token";
import { Layer } from "../../layer";
const handler = (handler: Function, instance: any, injector: Injector, parameter: IMethodDecorator<any, HeadOptions>) => {
    const options = parameter.options
    if (options) {
        let useGuards: CanLoad[] = []
        if (options.useGuards) {
            useGuards = options.useGuards.map(guard => injector.get<CanLoad>(guard));
        }
        injector.setStatic([{
            provide: ROUTES,
            useValue: new Layer(`HEAD`, options.path, {}, handler, useGuards),
            multi: true
        }])
    }
}
export const headHandler: StaticProvider = {
    provide: HeadMetadataKey,
    useValue: handler
}