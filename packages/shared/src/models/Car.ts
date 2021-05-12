import { object, string, number, Asserts } from 'yup';
import { EnergyType } from './EnergyType';
import { User } from './User';

export const newCarSchema = object({
    register: string().required(),
    name: string().required(),
    energyTypeId: number().required(),
});

export interface NewCar extends Asserts<typeof newCarSchema> {}

export const updateCarSchema = object({
    name: string(),
});

export interface UpdateCar extends Asserts<typeof updateCarSchema> {}

export interface Car {
    id: number;
    name: string;
    register: string;
    energyType: EnergyType;
    owners: User[];
    users: User[];
    createdAt: number;
    modifiedAt: number
}
