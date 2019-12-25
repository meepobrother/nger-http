import { parametersHandler } from './parameters'
import { getHandler } from './methods/get'
import { postHandler } from './methods/post'
import { StaticProvider } from '@nger/di'
import { allHandler } from './methods/all'
import { deleteHandler } from './methods/delete'
import { patchHandler } from './methods/patch'
import { optionsHandler } from './methods/options'
import { headHandler } from './methods/head'

export const handlers: StaticProvider[] = [
    getHandler,
    postHandler,
    allHandler,
    deleteHandler,
    patchHandler,
    optionsHandler,
    headHandler,
    ...parametersHandler
]
export * from './methods/error';