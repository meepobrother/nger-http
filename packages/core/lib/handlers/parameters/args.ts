import { StaticProvider, ParameterHandler, Injector } from "@nger/core";
import { ArgsMetadataKey, WithPipesOptions } from "../../decorator";
import { IParameterDecorator } from "@nger/decorator";
import { REQUEST, PARAMS } from '../../token'

function getBody(injector: Injector, property: string) {
    const req = injector.get(REQUEST)
    const body = req.body;
    return Reflect.get(body || {}, property)
}
function getParams(injector: Injector, property: string) {
    const params = injector.get<any>(PARAMS, null)
    return Reflect.get(params || {}, property)
}
function getQuery(injector: Injector, property: string) {
    const req = injector.get(REQUEST)
    const params = req.params;
    return Reflect.get(params || {}, property)
}
const handler: ParameterHandler = (handler: Function, parameters: Array<any>, instance: any, injector: Injector, parameter: IParameterDecorator<any, WithPipesOptions>): void => {
    const options = parameter.options;
    if (options) {
        if (options.property) {
            const body = getBody(injector, options.property)
            const params = getParams(injector, options.property)
            const query = getQuery(injector, options.property)
            if (typeof body !== 'undefined') {
                Reflect.set(parameters, parameter.parameterIndex, body)
            }
            else if (typeof params !== 'undefined') {
                Reflect.set(parameters, parameter.parameterIndex, params)
            }
            else if (typeof query !== 'undefined') {
                Reflect.set(parameters, parameter.parameterIndex, query)
            }
        }
    }
}
export const argsHandler: StaticProvider = {
    provide: ArgsMetadataKey,
    useValue: handler
}