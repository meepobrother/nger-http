import { StaticProvider, Injector, ControllerOptions } from "@nger/core";
import { HeaderMetadataKey, HeaderOptions } from "../../decorator";
import { IMethodDecorator, IClassDecorator } from "@nger/decorator";
import { RESPONSE } from "../../token";
const handler = (injector: Injector, item: IMethodDecorator<any, HeaderOptions>, parent: IClassDecorator<any, ControllerOptions>, path: string) => {
    const options = item.options;
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