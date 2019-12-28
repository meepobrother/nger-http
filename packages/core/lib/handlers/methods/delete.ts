import { StaticProvider, MethodRef } from "@nger/core";
import { DeleteMetadataKey } from "../../decorator";
import { createHandler } from "./util";
const handler = (it: MethodRef<any, any>) => {
    return createHandler(it, it.parent.metadata.options)('DELETE')
}
export const deleteHandler: StaticProvider = {
    provide: DeleteMetadataKey,
    useValue: handler
}