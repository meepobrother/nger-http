import { StaticProvider, MethodRef } from "@nger/core";
import { HeadMetadataKey } from "../../decorator";
import { createHandler } from "./util";
const handler = (it: MethodRef<any, any>) => {
    return createHandler(it, it.parent.metadata.options)('HEAD')
}
export const headHandler: StaticProvider = {
    provide: HeadMetadataKey,
    useValue: handler
}