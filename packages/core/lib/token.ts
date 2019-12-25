import { InjectionToken, HttpRequest, HttpResponse } from "@nger/core";
/**
 * 请求id
 */
export const REQUEST_ID = new InjectionToken(`@nger/core REQUEST_ID`);
/**
 * 请求
 */
export const REQUEST = new InjectionToken<HttpRequest<any>>(`@nger/core REQUEST`);
/**
 * 响应
 */
export const RESPONSE = new InjectionToken<HttpResponse<any>>(`@nger/core RESPONSE`);
/**
 * 结果处理钩子
 */
export const RESPONSE_HANDLER = new InjectionToken(`@nger/core RESPONSE_HANDLER`);
export interface Router {
    path: string;
    method: string;
    factory: () => any;
}
export const ROUTES = new InjectionToken<Router[]>(`ROUTES`)
