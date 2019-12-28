import { StaticProvider, MethodRef } from "@nger/core";
import { GetMetadataKey } from "../../decorator";
import { createHandler } from "./util";
const handler = (it: MethodRef<any,any>) => {
    return createHandler(it, it.parent.metadata.options)('GET')
}
export const getHandler: StaticProvider = {
    provide: GetMetadataKey,
    useValue: handler
}