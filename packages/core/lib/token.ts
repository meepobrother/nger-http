import { InjectionToken, StaticProvider } from "@nger/core";
import { HttpRequest, HttpResponse } from './http';
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
    factory: (providers: StaticProvider[]) => any;
}
export const ROUTES = new InjectionToken<Router[]>(`ROUTES`)


// pre logger id
export const PRE_LOGGER_ID = new InjectionToken<string>(`@nger/logger PRE_LOGGER_ID`)
// last time
export const LOGGER_LAST_TIME = new InjectionToken(`@nger/logger LOGGER_LAST_TIME`)
// service name
export const LOGGER_SERVICE_NAME = new InjectionToken(`@nger/logger LOGGER_SERVICE_NAME`)
// method name
export const LOGGER_METHOD_NAME = new InjectionToken(`@nger/logger LOGGER_METHOD_NAME`)
export const LOGGER_MODULE_CHAIN = new InjectionToken(`@nger/logger LOGGER_MODULE_CHAIN`)
