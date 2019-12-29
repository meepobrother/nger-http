import { headersHandler } from './headers';
import { argsHandler } from './args';
import { requestIdHandler } from './requestId';
import { paramHandler } from './param';
import { bodyHandler } from './body';
import { queryHandler } from './query';
import { reqHandler } from './req'
import { resHandler } from './res';
import { StaticProvider } from '@nger/di';

export const parametersHandler: StaticProvider[] = [
    bodyHandler,
    queryHandler,
    reqHandler,
    resHandler,
    paramHandler,
    requestIdHandler,
    argsHandler,
    headersHandler
]