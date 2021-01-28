import { Role } from "@drivery/shared";
import { AuthenticatedUser } from "./AuthenticatedUser";
import { MissingRoleError } from './errors/MissingRoleError';

export interface ProtectedMethodOptions<Response = any> {
    roles?: Role[];
    requestHook? (user: AuthenticatedUser, ...args): boolean;
    responseHook? (user: AuthenticatedUser, response: Response): boolean;
    requestHookError?(): Error;
    responseHookError? (): Error;
}

export const protectedMethod = ({
    roles = [],
    requestHook,
    responseHook,
    requestHookError = () => new Error(),
    responseHookError = () => new Error(),
}: ProtectedMethodOptions = {}) => {
    return (_target: any, _key: any, descriptor: PropertyDescriptor) => {    
        const method = descriptor.value;
        descriptor.value = async function (): Promise<any> {
            const user: AuthenticatedUser = this.user;
            if (!user) {
                const serviceName = this.constructor.name;
                throw new Error('Service `' + serviceName + '` missing instance variable `user` typeof `AuthenticatedUser`');
            }

            if (user.hasRole('admin')) {
                return method.apply(this, arguments);
            }

            if (!roles.some(r => user.hasRole(r))) {
                throw new MissingRoleError();
            }

            if (requestHook && !requestHook(user, ...arguments)) {
                throw requestHookError();
            }

            const response = await method.apply(this, arguments);

            if (responseHook && !responseHook(user, response)) {
                throw responseHookError();
            }

            return response;
        }
    }
}