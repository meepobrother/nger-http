import { createParameterDecorator, createDecorator, IParameterDecorator, IConstructorDecorator, createMethodDecorator } from '@nger/decorator';
import { UsePipes } from '@nger/core';
export const HeaderMetadataKey = `@nger/http HeaderMetadataKey`
export const Header = createMethodDecorator(HeaderMetadataKey)
/**
 * http params
 */
export const RequestMetadataKey = `@nger/http RequestMetadataKey`
interface Request { }
export const Req = createParameterDecorator<Request>(RequestMetadataKey)
export const ResponseMetadataKey = `@nger/http ResponseMetadataKey`
interface Response { }
export const Res = createParameterDecorator<Response>(ResponseMetadataKey)
export interface WithPipesOptions extends UsePipes {
    property: string;
}
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
