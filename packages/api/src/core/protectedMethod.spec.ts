import { AuthenticatedUser } from './AuthenticatedUser';
import { Role } from '@drivery/shared';
import { protectedMethod } from './protectedMethod';

const createMockUser = (roles: Role[] = []): AuthenticatedUser =>
    new AuthenticatedUser(
        1,
        'teppo@example.com',
        roles,
    );

describe('ProtectedMethod', () => {
    it ('should throw Error when service has no user', async () => {
        const mock = jest.fn(id => id);
        class TestService {
            @protectedMethod()
            async get (id: string): Promise<string> {
                return mock(id);
            } 
        }
        try {
            const service = new TestService();
            const promise = await service.get('kala');
    
            
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }

        expect(mock.mock.calls.length).toBe(0);
    });

    it ('should throw UnauthorizedAccessError when user does not have role', () => {
        const mock = jest.fn(id => id);
        class TestService {
            user: AuthenticatedUser = createMockUser();
    
            @protectedMethod({
                roles: [ 'user' ],
            })
            async get (id: string): Promise<string> {
                return mock(id);
            } 
        }

        const service = new TestService();
        const promise = service.get('kala');

        expect(promise).rejects.toThrowError(Error);
        expect(mock.mock.calls.length).toBe(0);
    });

    it ('should allow invoking function when user has one of the required roles', async () => {
        const mock = jest.fn(id => id);
        class TestService {
            user: AuthenticatedUser = createMockUser(['user']);
    
            @protectedMethod({
                roles: [ 'user' ],
            })
            async get (id: string): Promise<string> {
                return mock(id);
            } 
        }

        const service = new TestService();
        const response = await service.get('kala');

        expect(response).toBe('kala');
        expect(mock.mock.calls.length).toBe(1);
    });

    it ('should allow invoking function when user is admin', async () => {
        const mock = jest.fn(id => id);
        class TestService {
            user: AuthenticatedUser = createMockUser(['admin']);
    
            @protectedMethod({
                roles: [ 'user', 'admin' ],
            })
            async get (id: string): Promise<string> {
                return mock(id);
            } 
        }

        const service = new TestService();
        const response = await service.get('kala');

        expect(response).toBe('kala');
        expect(mock.mock.calls.length).toBe(1);
    });

    it ('should deny with custom request hook function', async () => {
        const mock = jest.fn(id => id);
        class TestService {
            user: AuthenticatedUser = createMockUser(['user']);
    
            @protectedMethod({
                roles: [ 'user' ],
                requestHook: (user, id): boolean => user.email === id,
            })
            async get (id: string): Promise<string> {
                return mock(id);
            } 
        }

        const service = new TestService();
        const promise = service.get('foo');

        expect(promise).rejects.toThrowError(Error);
        expect(mock.mock.calls.length).toBe(0);
    });

    it ('should allow with custom request hook function', async () => {
        const mock = jest.fn(id => id);
        class TestService {
            user: AuthenticatedUser = createMockUser(['user']);
    
            @protectedMethod({
                roles: [ 'user' ],
                requestHook: (user, id): boolean => user.email === 'teppo@example.com',
            })
            async get (id: string): Promise<string> {
                return mock(id);
            } 
        }

        const service = new TestService();
        const response = await service.get('organization');

        expect(response).toBe('organization');
        expect(mock.mock.calls.length).toBe(1);
    });

    it ('should deny with custom response hook function', async () => {
        const mock = jest.fn(email => ({ email }));
        class TestService {
            user: AuthenticatedUser = createMockUser(['user']);
    
            @protectedMethod({
                roles: [ 'user' ],
                responseHook: (user, response): boolean => user.email !== response.email,
            })
            async get (id: string): Promise<{ email: string }> {
                return mock(id);
            } 
        }

        const service = new TestService();
        const promise = service.get('foo');

        expect(promise).rejects.toThrowError(Error);
        expect(mock.mock.calls.length).toBe(1);
    });

    it ('should allow with custom response hook function', async () => {
        const mock = jest.fn(email => ({ email }));
        class TestService {
            user: AuthenticatedUser = createMockUser(['user']);
    
            @protectedMethod({
                roles: [ 'user' ],
                responseHook: (user, response): boolean => user.email === response.email,
            })
            async get (id: string): Promise<{ email: string }> {
                return mock(id);
            } 
        }

        const service = new TestService();
        const response = await service.get('teppo@example.com');

        expect(response).toEqual({ email: 'teppo@example.com' });
        expect(mock.mock.calls.length).toBe(1);
    });
});