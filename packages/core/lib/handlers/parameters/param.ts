import { StaticProvider, ParameterHandler, Injector, PipeTransform } from "@nger/core";
import { WithPipesOptions, ParamMetadataKey } from "../../decorator";
import { IParameterDecorator } from "@nger/decorator";
import { PARAMS } from '../../token'

const handler: ParameterHandler = (handler: Function, parameters: Array<any>, instance: any, injector: Injector, parameter: IParameterDecorator<any, WithPipesOptions>): void => {
    const options = parameter.options;
    const params = injector.get<any>(PARAMS)
    let val: any = params;
    if (options) {
        if (options.property) {
            val = Reflect.get(params, options.property)
        }
        if (options.usePipes) {
            options.usePipes.map(it => injector.get(it)).map(it => {
                if (it instanceof PipeTransform) {
                    val = it.transform(val, injector)
                }
            })
        }
    }
    Reflect.set(parameters, parameter.parameterIndex, val)
}
export const paramHandler: StaticProvider = {
    provide: ParamMetadataKey,
    useValue: handler
}