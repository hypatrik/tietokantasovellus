import { ApiEvent, HttpMehod } from 'core/intefaces/ApiEvent';
import { IApiContext } from 'core/intefaces/IApiContext';
import { NotFoundError } from './errors';

const resoleApiPath = (method: HttpMehod, endpoint: string) => `${method}: ${endpoint}`;

export type ApiEventHandler = (event: ApiEvent, context: IApiContext) => Promise<any>;

const routes: Record<string, ApiEventHandler> = {}

const addRoute = (method: HttpMehod, endpoint: string, cb: ApiEventHandler) => {
    routes[resoleApiPath(method, endpoint)] = cb;
}

const onRequest = <T extends Object = any>(method: HttpMehod, endpoint: string, event: ApiEvent, context: IApiContext): Promise<T> => {
    const cb = routes[resoleApiPath(method, endpoint)];

    if (!cb) {
        throw new NotFoundError(`Route ${method} ${endpoint} not found!`);
    }

    return cb(event, context);
}

export const router = {
    addRoute,
    onRequest,
    get (endpoint: string, cb: ApiEventHandler) {
        return addRoute('GET', endpoint, cb);
    },
    post (endpoint: string, cb: ApiEventHandler) {
        return addRoute('POST', endpoint, cb);
    },
    put (endpoint: string, cb: ApiEventHandler) {
        return addRoute('PUT', endpoint, cb);
    },
    delete (endpoint: string, cb: ApiEventHandler) {
        return addRoute('DELETE', endpoint, cb);
    },
    patch (endpoint: string, cb: ApiEventHandler) {
        return addRoute('PATCH', endpoint, cb);
    },
};
