import { StaticProvider, Injector, ControllerOptions } from "@nger/core";
import { DeleteOptions, DeleteMetadataKey } from "../../decorator";
import { IMethodDecorator, IClassDecorator } from "@nger/decorator";
import { createHandler } from "./util";
const handler = (injector: Injector, item: IMethodDecorator<any, DeleteOptions>, parent: IClassDecorator<any, ControllerOptions>, path: string) => {
    return createHandler(injector, item, path)('DELETE')
}
export const deleteHandler: StaticProvider = {
    provide: DeleteMetadataKey,
    useValue: handler
}