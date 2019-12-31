import { StaticProvider, MethodHandler, Injector, } from "@nger/core";
import { HeaderMetadataKey } from "../../decorator";
import { RESPONSE } from "../../token";
import { IMethodDecorator } from '@nger/decorator';
const handler: MethodHandler = (handler: Function, instance: any, injector: Injector, parameter: IMethodDecorator) => {
    const options = parameter.options;
    if (options) {
        const res = injector.get(RESPONSE)
        Object.keys(options).map((key: string) => {
            res.headers.set(key, Reflect.get(options, key))
        });
    }
}
export const headerHandler: StaticProvider = {
    provide: HeaderMetadataKey,
    useValue: handler
}