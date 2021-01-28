import { User } from "@drivery/shared";

export interface IUserResource {
    /**
     * Return a user
     * @param id - user id or email
     * @returns Promise<User>
     * @throws NotFoundError
     */
    get (id: number | string): Promise<User>;
}