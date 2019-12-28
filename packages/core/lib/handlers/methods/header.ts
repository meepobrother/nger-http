import { StaticProvider, MethodRef } from "@nger/core";
import { HeaderMetadataKey } from "../../decorator";
import { RESPONSE } from "../../token";
const handler = (it: MethodRef<any, any>) => {
    const options = it.options;
    if (options) {
        const res = it.injector.get(RESPONSE)
        Object.keys(options).map((key: string) => {
            res.headers.set(key, Reflect.get(options, key))
        });
    }
}
export const headerHandler: StaticProvider = {
    provide: HeaderMetadataKey,
    useValue: handler
}