import { Role } from "../constants/roles";
import { object, string, Asserts } from 'yup';

export const newUserSchema= object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().email().required(),
});

export interface NewUser extends Asserts<typeof newUserSchema> {}

export interface User extends NewUser {
    id: number;
    roles?: Role[];
    active: boolean;
    createdAt: number;
    modifiedAt: number,
}
