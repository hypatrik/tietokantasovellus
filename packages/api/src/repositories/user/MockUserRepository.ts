import { User } from '@drivery/shared';
import { NotFoundError } from 'core/errors';
import { IUserRepository } from 'core/intefaces/IUserRepository';

export const mockUsers: User[] = [
    null,
    {
        id: 1,
        email: 'teppo@example.com',
        firstName: 'Teppo',
        lastName: 'Testaaja',
        roles: [ 'user' ],
        active: true,
        createdAt: 1618231797417,
        modifiedAt: 1618231797417,
        
    },
    {
        id: 2,
        email: 'seppo@example.com',
        firstName: 'Seppo',
        lastName: 'Testaaja',
        roles: [ 'user' ],
        active: true,
        createdAt: 1618231797417,
        modifiedAt: 1618231797417,
    },
    {
        id: 3,
        email: 'matti@example.com',
        firstName: 'Matti',
        lastName: 'Testaaja',
        roles: [ 'user' ],
        active: true,
        createdAt: 1618231797417,
        modifiedAt: 1618231797417,
    },
    {
        id: 4,
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'Admin',
        roles: [ 'admin', 'user' ],
        active: true,
        createdAt: 1618231797417,
        modifiedAt: 1618231797417,
    },
];

const mockEmailIndex = {
    'teppo@example.com': 1,
    'seppo@example.com': 2,
    'matti@example.com': 3,
    'admin@example.com': 4,
}

export class MockUserRepository implements IUserRepository {
    async get (id: number | string): Promise<User> {
        let user = mockUsers[id] || mockEmailIndex[id] || null;

        if (!user) {
            throw new NotFoundError();
        }
    
        return user;
    }
}