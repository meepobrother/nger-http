import { createMethodDecorator, createParameterDecorator, createDecorator, IParameterDecorator, IConstructorDecorator } from '@nger/decorator';
import { UsePipes } from '@nger/core';
/**
 * http
 */
export const HeaderMetadataKey = `HeaderMetadataKey`
export interface Header {
    [key: string]: string
}
export const Header = createMethodDecorator<Header>(HeaderMetadataKey);
export const HttpCodeMetadataKey = `HttpCodeMetadataKey`
export const HttpCode = createMethodDecorator<number>(HttpCodeMetadataKey);
export interface Redirect {
    url: string;
    code?: number;
}
export const RedirectMetadataKey = `RedirectMetadataKey`
export const Redirect = createMethodDecorator<Redirect>(RedirectMetadataKey);
export const RenderMetadataKey = `RenderMetadataKey`
export const Render = createMethodDecorator<string>(RenderMetadataKey);
/**
 * http params
 */
export const RequestMetadataKey = `RequestMetadataKey`
interface Request { }
export const Req = createParameterDecorator<Request>(RequestMetadataKey)
export const ResponseMetadataKey = `ResponseMetadataKey`
interface Response { }
export const Res = createParameterDecorator<Response>(ResponseMetadataKey)

export const NextMetadataKey = `NextMetadataKey`
interface Next { }
export const Next = createParameterDecorator<Next>(NextMetadataKey)
export const IpMetadataKey = `IpMetadataKey`
interface Ip { }
export const Ip = createParameterDecorator<Ip>(IpMetadataKey)
export const SessionMetadataKey = `SessionMetadataKey`
interface Session { }
export const Session = createParameterDecorator<Session>(SessionMetadataKey)
export const CookiesMetadataKey = `CookiesMetadataKey`
interface Cookies { }
export const Cookies = createParameterDecorator<Cookies>(CookiesMetadataKey)
export const UploadedFileMetadataKey = `UploadedFileMetadataKey`
export const UploadedFile = createParameterDecorator<string>(UploadedFileMetadataKey)
export const UploadedFilesMetadataKey = `UploadedFilesMetadataKey`
interface UploadedFiles { }
export interface WithPipesOptions extends UsePipes {
    property: string;
}
export const UploadedFiles = createParameterDecorator<UploadedFiles>(UploadedFilesMetadataKey)
export function isWithPipesOptions(val: any): val is WithPipesOptions {
    return val && !!val.property
}
const withPipesOptionsHandler = (it: IParameterDecorator<any, WithPipesOptions | string> | IConstructorDecorator<any, WithPipesOptions | string>) => {
    const options = it.options;
    if (options) {
        if (!isWithPipesOptions(options)) {
            it.options = {
                property: options
            }
        }
    }
}
// http headers
export const HeadersMetadataKey = `HeadersMetadataKey`
export const Headers = createParameterDecorator<WithPipesOptions | string>(HeadersMetadataKey, withPipesOptionsHandler)
// http query and graphql query
export const QueryMetadataKey = `QueryMetadataKey`
export const Query = createDecorator<WithPipesOptions | string>(QueryMetadataKey, withPipesOptionsHandler)
// http post body
export const BodyMetadataKey = `BodyMetadataKey`
export const Body = createParameterDecorator<WithPipesOptions | string>(BodyMetadataKey, withPipesOptionsHandler)
// http path param
export const ParamMetadataKey = `ParamMetadataKey`
export const Param = createParameterDecorator<WithPipesOptions | string>(ParamMetadataKey, withPipesOptionsHandler)
// args
export const ArgsMetadataKey = `ParamMetadataKey`
export const Args = createParameterDecorator<WithPipesOptions | string>(ArgsMetadataKey, withPipesOptionsHandler)
