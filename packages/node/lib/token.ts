import { InjectionToken } from '@nger/core'
import { HttpRequest, Layer, HttpResponse } from '@nger/http'
export interface NodeAfterPlugin {
    (result: any, router: Layer, request: HttpRequest<any>, response: HttpResponse<any>): HttpResponse<any>
}
export const NODE_AFTER_PLUGINS = new InjectionToken<NodeAfterPlugin[]>(`@nger/http-node NODE_AFTER_PLUGINS`)
export interface NodeBeforePlugin {
    (router: Layer, request: HttpRequest<any>, response: HttpResponse<any>): HttpResponse<any>
}
export const NODE_BEFORE_PLUGINS = new InjectionToken<NodeBeforePlugin[]>(`@nger/http-node NODE_BEFORE_PLUGINS`)

