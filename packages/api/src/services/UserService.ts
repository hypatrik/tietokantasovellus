import { User } from '@drivery/shared';
import { AuthenticatedUser } from 'core/AuthenticatedUser';
import { IUserRepository } from 'core/intefaces/IUserRepository';

export class UserService {
    constructor (
        private userResource: IUserRepository,
        protected user: AuthenticatedUser,
    ) {}


    get (id: number | string): Promise<User> {
        return this.userResource.get(id);
    }
}
