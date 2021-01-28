import { Role } from "@drivery/shared";
import { AuthenticatedUser } from "./AuthenticatedUser";

export interface ProtectedMethodOptions<Response = any> {
    roles?: Role[];
    requestHook? (user: AuthenticatedUser, ...args): boolean;
    responseHook? (user: AuthenticatedUser, response: Response): boolean;
}

export const protectedMethod = ({
    roles = [],
    requestHook,
    responseHook,
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
                throw new Error('Missing required role');
            }

            if (requestHook && !requestHook(user, ...arguments)) {
                throw new Error('Custom function authorize failed');
            }

            const response = await method.apply(this, arguments);

            if (responseHook && !responseHook(user, response)) {
                throw new Error('Custom function authorize failed');
            }

            return response;
        }
    }
}