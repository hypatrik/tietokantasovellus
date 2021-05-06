import { Role, User } from "@drivery/shared";

export class AuthenticatedUser {
    private _roles: Set<Role>;

    constructor (
        public readonly userId: number,
        public readonly email: string,
        public readonly roles: Role[],
    ) {
        this._roles = new Set(roles);
    }

    public hasRole (role: Role): boolean {
        return this._roles.has(role);
    }

    public hasIdOrEmail(id: number | string): boolean {
        return this.email === id || this.userId === id;
    }

    static fromUser (user: User) {
        return new AuthenticatedUser(
            user.id,
            user.email,
            user.roles,
        );
    }

}