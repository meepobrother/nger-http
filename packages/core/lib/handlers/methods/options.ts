import { StaticProvider, Injector, ControllerOptions } from "@nger/core";
import { OptionsOptions, OptionsMetadataKey } from "../../decorator";
import { IMethodDecorator, IClassDecorator } from "@nger/decorator";
import { createHandler } from "./util";
const handler = (injector: Injector, item: IMethodDecorator<any, OptionsOptions>, parent: IClassDecorator<any, ControllerOptions>, path: string) => {
    return createHandler(injector, item, path)('OPTIONS')
}
export const optionsHandler: StaticProvider = {
    provide: OptionsMetadataKey,
    useValue: handler
}