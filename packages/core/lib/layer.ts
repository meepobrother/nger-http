import { StaticProvider, CanLoad } from '@nger/core';
import { Key, pathToRegexp, TokensToRegexpOptions, ParseOptions, } from 'path-to-regexp';
import { PARAMS } from './token'
export interface LayerRegExp extends RegExp {
    fast_star: boolean;
    fast_slash: boolean;
}
export type LayerOptions = TokensToRegexpOptions & ParseOptions;
export interface LayoutNext {
    (err: Error | null): void;
}
export class LayerError extends Error {
    status: number;
    statusCode: number;
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
export class Layer {
    handle: Function;
    name: string;
    params: any;
    path: string | undefined;
    useGuards: CanLoad[];
    regexp: LayerRegExp;
    keys: Key[];
    method: string;
    constructor(method: string, path: string, options: LayerOptions = {}, fn: Function, useGuards: CanLoad[]) {
        this.handle = fn;
        this.method = method;
        this.name = fn.name || `<anonymous>`;
        this.regexp = pathToRegexp(path, this.keys = [], options) as LayerRegExp;
        this.regexp.fast_star = path === "*"
        this.regexp.fast_slash = path === '/' && options.end === false
    }
    handleRequest(providers: StaticProvider[]) {
        return this.handle(providers.concat(...[{
            provide: PARAMS,
            useValue: this.params
        }]));
    }
    match(path: string | null) {
        let match: RegExpExecArray | null = null;
        if (path !== null) {
            // fast path non-ending match for / (any path matches)
            if (this.regexp.fast_slash) {
                this.params = {}
                this.path = ''
                return true
            }
            // fast path for * (everything matched in a param)
            if (this.regexp.fast_star) {
                this.params = { '0': this.decodeParam(path) }
                this.path = path
                return true
            }
            // match the path
            match = this.regexp.exec(path)
        }
        if (!match) {
            this.params = undefined;
            this.path = undefined;
            return false;
        }
        // store values
        this.params = {};
        this.path = match[0]
        const keys = this.keys;
        const params = this.params;
        for (let i = 1; i < match.length; i++) {
            const key = keys[i - 1];
            const prop = key.name;
            const val = this.decodeParam(match[i])
            if (val !== undefined || !(hasOwnProperty.call(params, prop))) {
                params[prop] = val;
            }
        }
        return true;
    }
    private decodeParam(val: string) {
        try {
            return decodeURIComponent(val);
        } catch (err) {
            if (err instanceof LayerError) {
                err.message = 'Failed to decode param \'' + val + '\'';
                err.status = err.statusCode = 400;
            }
            throw err;
        }
    }
}
