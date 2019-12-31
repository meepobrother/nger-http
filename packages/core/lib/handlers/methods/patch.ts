import { StaticProvider, MethodHandler, Injector, CanLoad } from "@nger/core";
import { PatchMetadataKey, PatchOptions } from "../../decorator";
import { IMethodDecorator } from '@nger/decorator'
import { ROUTES } from "../../token";
import { Layer } from "../../layer";
const handler: MethodHandler = (handler: Function, instance: any, injector: Injector, parameter: IMethodDecorator<any, PatchOptions>) => {
    const options = parameter.options
    if (options) {
        let useGuards: CanLoad[] = []
        if (options.useGuards) {
            useGuards = options.useGuards.map(guard => injector.get<CanLoad>(guard));
        }
        injector.setStatic([{
            provide: ROUTES,
            useValue: new Layer(`PATCH`, options.path, {}, handler, useGuards),
            multi: true
        }])
    }
}
export const patchHandler: StaticProvider = {
    provide: PatchMetadataKey,
    useValue: handler
}