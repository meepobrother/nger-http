import { StaticProvider, Injector, ControllerOptions } from "@nger/core";
import { HeadOptions, HeadMetadataKey } from "../../decorator";
import { IMethodDecorator, IClassDecorator } from "@nger/decorator";
import { createHandler } from "./util";
const handler = (injector: Injector, item: IMethodDecorator<any, HeadOptions>, parent: IClassDecorator<any, ControllerOptions>, path: string) => {
    return createHandler(injector, item, path)('HEAD')
}
export const headHandler: StaticProvider = {
    provide: HeadMetadataKey,
    useValue: handler
}