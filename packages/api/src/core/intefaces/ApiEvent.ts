import { User } from '@drivery/shared';

export type ApiUser = Pick<User, 'email' | 'id' | 'roles'>;
export type HttpMehod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiEvent<T extends object = any> {
    pathParams: Record<string, string>;
    searchParams: Record<string, string>;
    user?: ApiUser;
    body?: T;
}
