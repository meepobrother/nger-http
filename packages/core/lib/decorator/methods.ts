import { createMethodDecorator, Type, IMethodDecorator } from '@nger/decorator';

/**
 * http methods
 */
interface HttpMethodOptions {
    path: string;
    useGuards?: Type<any>[];
}
function httpMethodHandler(it: IMethodDecorator<any, HttpMethodOptions | string>) {
    const options = it.options;
    if (typeof options === 'string') {
        it.options = {
            path: options
        }
    }
    else if (options) {
        it.options = {
            ...options
        }
    } else {
        it.options = {
            path: it.property as string
        }
    }
}
export function isHttpMethodOptions(val: any): val is HttpMethodOptions {
    return val && typeof val.path === 'string'
}
export const GetMetadataKey = `GetMetadataKey`
export interface GetOptions extends HttpMethodOptions { }
export const Get = createMethodDecorator<GetOptions | string>(GetMetadataKey, httpMethodHandler);
export const PostMetadataKey = `PostMetadataKey`
export interface PostOptions extends HttpMethodOptions { }
export const Post = createMethodDecorator<PostOptions | string>(PostMetadataKey, httpMethodHandler);
export const AllMetadataKey = `AllMetadataKey`
export interface AllOptions extends HttpMethodOptions { }
export const All = createMethodDecorator<AllOptions | string>(AllMetadataKey, httpMethodHandler);
export const DeleteMetadataKey = `DeleteMetadataKey`
export interface DeleteOptions extends HttpMethodOptions { }
export const Delete = createMethodDecorator<DeleteOptions | string>(DeleteMetadataKey, httpMethodHandler);
export const PatchMetadataKey = `PatchMetadataKey`
export interface PatchOptions extends HttpMethodOptions { }
export const Patch = createMethodDecorator<PatchOptions | string>(PatchMetadataKey, httpMethodHandler);
export const OptionsMetadataKey = `OptionsMetadataKey`
export interface OptionsOptions extends HttpMethodOptions { }
export const Options = createMethodDecorator<OptionsOptions | string>(OptionsMetadataKey, httpMethodHandler);
export const HeadMetadataKey = `HeadMetadataKey`;
export interface HeadOptions extends HttpMethodOptions { }
export const Head = createMethodDecorator<HeadOptions | string>(HeadMetadataKey, httpMethodHandler);