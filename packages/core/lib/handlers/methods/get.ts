import { StaticProvider, Injector, ControllerOptions } from "@nger/core";
import { GetMetadataKey, GetOptions } from "../../decorator";
import { IMethodDecorator, IClassDecorator } from "@nger/decorator";
import { createHandler } from "./util";
const handler = (injector: Injector, item: IMethodDecorator<any, GetOptions>, parent: IClassDecorator<any, ControllerOptions>, path: string) => {
    return createHandler(injector, item, path)('GET')
}
export const getHandler: StaticProvider = {
    provide: GetMetadataKey,
    useValue: handler
}