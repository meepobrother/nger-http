import { StaticProvider, Injector, CanLoad } from "@nger/core";
import { GetMetadataKey, GetOptions } from "../../decorator";
import { IMethodDecorator } from '@nger/decorator'
import { ROUTES } from "../../token";
import { Layer } from "../../layer";
const handler = (handler: Function, instance: any, injector: Injector, parameter: IMethodDecorator<any, GetOptions>) => {
    const options = parameter.options
    if (options) {
        let useGuards: CanLoad[] = []
        if (options.useGuards) {
            useGuards = options.useGuards.map(guard => injector.get<CanLoad>(guard));
        }
        injector.setStatic([{
            provide: ROUTES,
            useValue: new Layer(`GET`, options.path, {}, handler, useGuards),
            multi: true
        }])
    }
}
export const getHandler: StaticProvider = {
    provide: GetMetadataKey,
    useValue: handler
}