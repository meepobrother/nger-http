import { StaticProvider } from '@nger/core'
import { NODE_BEFORE_PLUGINS } from './token';
import { Layer, HttpRequest, HttpResponse } from '@nger/http'
export const corsHandler: StaticProvider = {
    provide: NODE_BEFORE_PLUGINS,
    useFactory: () => (router: Layer, request: HttpRequest<any>, response: HttpResponse<any>) => {
        const headers = response.headers;
        headers.set(`Access-Control-Allow-Headers`, `*`)
        headers.set(`Access-Control-Allow-Methods`, `*`)
        headers.set(`Access-Control-Allow-Credentials`, true)
        headers.set(`Access-Control-Max-Age`, 1728000)
        headers.set(`Access-Control-Allow-Origin`, `*`)
        headers.set(`Access-Control-Expose-Headers`, `*`)
        if (request.method === "OPTIONS") {
            headers.set('Content-Length', 0)
        }
        return response.clone({
            headers: headers
        })
    },
    deps: [],
    multi: true
};