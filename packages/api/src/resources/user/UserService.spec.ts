import { AuthenticatedUser } from 'core/AuthenticatedUser';
import { UnauthorizedError } from 'core/errors';
import { MockUserResource } from './MockUserResource';
import { UserService } from './UserService';

const TEPPO_EMAIL = 'teppo@example.com';

describe('UserService', () => {
    describe('as normal user', () => {
        let userService: UserService;

        beforeEach(() => {
            userService = new UserService(
                new MockUserResource(),
                new AuthenticatedUser(
                    1,
                    TEPPO_EMAIL,
                    ['user']
                ),
            );
        });
    
        it('should return own user details by id', async () => {
            const user = await userService.get(1);

            expect(user.email).toEqual(TEPPO_EMAIL);
        });

        it('should return own user details by email', async () => {
            const user = await userService.get(TEPPO_EMAIL);

            expect(user.email).toEqual(TEPPO_EMAIL);
        });

        it('should return throw UnauthorizedError when accessing other user by id', async () => {
            const promise = userService.get(1);

            expect(promise).rejects.toThrowError(UnauthorizedError);
        });

        it('should return throw UnauthorizedError when accessing other user by email', async () => {
            const promise = userService.get(TEPPO_EMAIL);

            expect(promise).rejects.toThrowError(UnauthorizedError);
        });
    });
});