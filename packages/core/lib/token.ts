import { InjectionToken, StaticProvider } from "@nger/core";
import { HttpRequest, HttpResponse } from './http';
import { Layer } from './layer'
/**
 * 请求id
 */
export const REQUEST_ID = new InjectionToken(`@nger/http REQUEST_ID`);
/**
 * 请求
 */
export const REQUEST = new InjectionToken<HttpRequest<any>>(`@nger/http REQUEST`);
/**
 * 响应
 */
export const RESPONSE = new InjectionToken<HttpResponse<any>>(`@nger/http RESPONSE`);
/**
 * 结果处理钩子
 */
export const RESPONSE_HANDLER = new InjectionToken(`@nger/http RESPONSE_HANDLER`);

export const ROUTES = new InjectionToken<Layer[]>(`ROUTES`)
// pre logger id
export const PRE_LOGGER_ID = new InjectionToken<string>(`@nger/http PRE_LOGGER_ID`)
// last time
export const LOGGER_LAST_TIME = new InjectionToken(`@nger/http LOGGER_LAST_TIME`)
// service name
export const LOGGER_SERVICE_NAME = new InjectionToken(`@nger/http LOGGER_SERVICE_NAME`)
// method name
export const LOGGER_METHOD_NAME = new InjectionToken(`@nger/http LOGGER_METHOD_NAME`)
export const LOGGER_MODULE_CHAIN = new InjectionToken(`@nger/http LOGGER_MODULE_CHAIN`)
export const PARAMS = new InjectionToken(`@nger/http PARAMS`)
/**
 * cookie
 */
export const COOKIE = new InjectionToken(`COOKIE`);
export const COOKIE_SECRET = new InjectionToken<string[]>(`COOKIE_SECRET`);
export const CURRENT_SECRET = new InjectionToken<string>(`CURRENT_SECRET`);

export const SESSION = new InjectionToken(`@nger/http SESSION`)
