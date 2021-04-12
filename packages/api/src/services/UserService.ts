import { User } from '@drivery/shared';
import { AuthenticatedUser } from 'core/AuthenticatedUser';
import { UnauthorizedError } from 'core/errors';
import { IUserRepository } from 'core/intefaces/IUserRepository';
import { protectedMethod } from 'core/protectedMethod';

export class UserService {
    constructor (
        private userResource: IUserRepository,
        protected user: AuthenticatedUser,
    ) {}

    @protectedMethod({
        roles: [ 'user' ],
        requestHook: (user: AuthenticatedUser, id: number | string) => user.hasIdOrEmail(id),
        requestHookError: () => new UnauthorizedError(),
    })
    get (id: number | string): Promise<User> {
        return this.userResource.get(id);
    }
}
