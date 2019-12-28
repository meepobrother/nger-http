import { StaticProvider } from "@nger/core";
import { AllOptions, AllMetadataKey } from "../../decorator";
import { createHandler } from "./util";
import { MethodRef } from '@nger/di'
const handler = (it: MethodRef<any, AllOptions>) => {
    return createHandler(it, it.parent.metadata.options)('ALL')
}
export const allHandler: StaticProvider = {
    provide: AllMetadataKey,
    useValue: handler
}