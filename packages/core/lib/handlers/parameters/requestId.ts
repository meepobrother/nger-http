import { StaticProvider, ParameterHandler, Injector } from "@nger/core";
import { WithPipesOptions, RequestIdMetadataKey } from "../../decorator";
import { IParameterDecorator } from "@nger/decorator";
import { REQUEST_ID } from '../../token'

const handler: ParameterHandler = (handler: Function, parameters: Array<any>, instance: any, injector: Injector, parameter: IParameterDecorator<any, WithPipesOptions>): void => {
    const requestId = injector.get(REQUEST_ID)
    Reflect.set(parameters, parameter.parameterIndex, requestId)
}
export const requestIdHandler: StaticProvider = {
    provide: RequestIdMetadataKey,
    useValue: handler
}