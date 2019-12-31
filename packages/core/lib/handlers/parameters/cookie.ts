import { CookiesMetadataKey, CookiesOptions } from "../../decorator";
import { COOKIE } from '../../token'
import { IParameterDecorator } from "@nger/decorator";
import { StaticProvider, Injector, InjectionToken } from "@nger/core";
const handler = (
    method: Function,
    args: any[],
    instance: any,
    injector: Injector,
    item: IParameterDecorator<any, CookiesOptions>
) => {
    const cookies = injector.get<any>(COOKIE, {});
    const options = item.options;
    if (options) {
        let path = ``;
        if (options.path instanceof InjectionToken) {
            path = injector.get(options.path);
        } else {
            path = options.path;
        }
        Reflect.set(args, item.parameterIndex, Reflect.get(cookies || {}, path));
    } else {
        Reflect.set(args, item.parameterIndex, cookies);
    }
};
export const cookieHandler: StaticProvider = {
    provide: CookiesMetadataKey,
    useValue: handler
};
