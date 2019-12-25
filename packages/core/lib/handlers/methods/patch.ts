import { StaticProvider, Injector, ControllerOptions } from "@nger/core";
import { PatchOptions, PatchMetadataKey } from "../../decorator";
import { IMethodDecorator, IClassDecorator } from "@nger/decorator";
import { createHandler } from "./util";
const handler = (injector: Injector, item: IMethodDecorator<any, PatchOptions>, parent: IClassDecorator<any, ControllerOptions>, path: string) => {
    return createHandler(injector, item, path)('PATCH')
}
export const patchHandler: StaticProvider = {
    provide: PatchMetadataKey,
    useValue: handler
}