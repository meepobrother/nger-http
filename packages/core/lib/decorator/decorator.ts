import { createMethodDecorator, createParameterDecorator, createDecorator, IParameterDecorator, IConstructorDecorator } from '@nger/decorator';
import { UsePipes } from '@nger/core';
/**
 * http
 */
export const HeaderMetadataKey = `@nger/http HeaderMetadataKey`
export interface HeaderOptions {
    [key: string]: string
}
export const Header = createMethodDecorator<HeaderOptions>(HeaderMetadataKey);
export const HttpCodeMetadataKey = `@nger/http HttpCodeMetadataKey`
export const HttpCode = createMethodDecorator<number>(HttpCodeMetadataKey);
export interface Redirect {
    url: string;
    code?: number;
}
export const RedirectMetadataKey = `@nger/http RedirectMetadataKey`
export const Redirect = createMethodDecorator<Redirect>(RedirectMetadataKey);
export const RenderMetadataKey = `@nger/http RenderMetadataKey`
export const Render = createMethodDecorator<string>(RenderMetadataKey);
/**
 * http params
 */
export const RequestMetadataKey = `@nger/http RequestMetadataKey`
interface Request { }
export const Req = createParameterDecorator<Request>(RequestMetadataKey)
export const ResponseMetadataKey = `@nger/http ResponseMetadataKey`
interface Response { }
export const Res = createParameterDecorator<Response>(ResponseMetadataKey)

export const NextMetadataKey = `@nger/http NextMetadataKey`
interface Next { }
export const Next = createParameterDecorator<Next>(NextMetadataKey)
export const IpMetadataKey = `@nger/http IpMetadataKey`
interface Ip { }
export const Ip = createParameterDecorator<Ip>(IpMetadataKey)
export const SessionMetadataKey = `@nger/http SessionMetadataKey`
interface Session { }
export const Session = createParameterDecorator<Session>(SessionMetadataKey)
export const UploadedFileMetadataKey = `@nger/http UploadedFileMetadataKey`
export const UploadedFile = createParameterDecorator<string>(UploadedFileMetadataKey)
export const UploadedFilesMetadataKey = `@nger/http UploadedFilesMetadataKey`
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
export const HeadersMetadataKey = `@nger/http HeadersMetadataKey`
export const Headers = createParameterDecorator<WithPipesOptions | string>(HeadersMetadataKey, withPipesOptionsHandler)
// http query and graphql query
export const QueryMetadataKey = `@nger/http QueryMetadataKey`
export const Query = createDecorator<WithPipesOptions | string>(QueryMetadataKey, withPipesOptionsHandler)
// http post body
export const BodyMetadataKey = `@nger/http BodyMetadataKey`
export const Body = createParameterDecorator<WithPipesOptions | string>(BodyMetadataKey, withPipesOptionsHandler)
// http path param
export const ParamMetadataKey = `@nger/http ParamMetadataKey`
export const Param = createParameterDecorator<WithPipesOptions | string>(ParamMetadataKey, withPipesOptionsHandler)
// args
export const ArgsMetadataKey = `@nger/http ParamMetadataKey`
export const Args = createParameterDecorator<WithPipesOptions | string>(ArgsMetadataKey, withPipesOptionsHandler)
