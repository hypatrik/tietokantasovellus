import { User } from "@drivery/shared";

export interface IUserRepository {
    get (id: number | string): Promise<User>;
}