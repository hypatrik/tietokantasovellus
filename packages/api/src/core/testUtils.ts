import { mockUsers } from 'repositories/user/MockUserRepository';
import { AuthenticatedUser } from './AuthenticatedUser';

export const createMockUser = (userId: number): AuthenticatedUser => {
    const user = mockUsers[userId] || null;
    return AuthenticatedUser.fromUser(user);
}