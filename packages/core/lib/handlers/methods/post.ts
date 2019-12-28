import { StaticProvider, MethodRef } from "@nger/core";
import { PostMetadataKey } from "../../decorator";
import { createHandler } from "./util";
const handler = (it: MethodRef<any, any>) => {
    return createHandler(it, it.parent.metadata.options)('POST')
}
export const postHandler: StaticProvider = {
    provide: PostMetadataKey,
    useValue: handler
}