import { StaticProvider, ParameterHandler, Injector } from "@nger/core";
import { HeadersMetadataKey, WithPipesOptions } from "../../decorator";
import { IParameterDecorator } from "@nger/decorator";
import { REQUEST } from '../../token'

const handler: ParameterHandler = (handler: Function, parameters: Array<any>, instance: any, injector: Injector, parameter: IParameterDecorator<any, WithPipesOptions>): void => {
    const options = parameter.options;
    const req = injector.get(REQUEST)
    let headers = req.headers;
    if (options) {
        if (options.property) {
            Reflect.set(parameters, parameter.parameterIndex, headers.get(options.property))
        }
    }
    Reflect.set(parameters, parameter.parameterIndex, headers)
}
export const headersHandler: StaticProvider = {
    provide: HeadersMetadataKey,
    useValue: handler
}