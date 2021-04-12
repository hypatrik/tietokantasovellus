import { object, string, Asserts } from 'yup';
import { EnergyType } from './EnergyType';
import { Refuel } from './Refuel';
import { User } from './User';

export const newCarSchema= object({
    register: string().required(),
    name: string().required(),
});

export interface NewCar extends Asserts<typeof newCarSchema> {}

export interface Car extends NewCar {
    id: number;
    energyType: EnergyType;
    refuels: Refuel[];
    owners: User[];
    users: User[];
    createdAt: number;
    modifiedAt: number
}
