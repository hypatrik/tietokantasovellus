import { User } from '@drivery/shared';
import { IUserResource } from 'core/intefaces/IUserResource';

export class MockUserResource implements IUserResource {
    async get (id: number | string): Promise<User> {
        if (id !== 1 && id !== 'teppo@example.com') {
            return null;
        }

        let userId: number, email: string;
        if (typeof id === 'number') {
            userId = id;
            email = 'teppo@example.com';
        } else {
            userId = 1;
            email = id;
        }

        return {
            userId,
            email,
            firstName: 'Teppo',
            lastName: 'Testaaja',
            roles: [ 'user' ],
            active: true,
        }
    }
}