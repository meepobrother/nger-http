import { StaticProvider, Injector, ControllerOptions } from "@nger/core";
import { AllOptions, AllMetadataKey } from "../../decorator";
import { IMethodDecorator, IClassDecorator } from "@nger/decorator";
import { createHandler } from "./util";
const handler = (injector: Injector, item: IMethodDecorator<any, AllOptions>, parent: IClassDecorator<any, ControllerOptions>, path: string) => {
    return createHandler(injector, item, path)('ALL')
}
export const allHandler: StaticProvider = {
    provide: AllMetadataKey,
    useValue: handler
}