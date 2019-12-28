import { StaticProvider, MethodRef } from "@nger/core";
import { OptionsMetadataKey } from "../../decorator";
import { createHandler } from "./util";
const handler = (it: MethodRef<any,any>) => {
    return createHandler(it, it.parent.metadata.options)('OPTIONS')
}
export const optionsHandler: StaticProvider = {
    provide: OptionsMetadataKey,
    useValue: handler
}