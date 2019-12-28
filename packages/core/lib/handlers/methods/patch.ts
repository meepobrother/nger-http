import { StaticProvider, MethodRef } from "@nger/core";
import { PatchMetadataKey } from "../../decorator";
import { createHandler } from "./util";
const handler = (it: MethodRef<any,any>) => {
    return createHandler(it, it.parent.metadata.options)('PATCH')
}
export const patchHandler: StaticProvider = {
    provide: PatchMetadataKey,
    useValue: handler
}