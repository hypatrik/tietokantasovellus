import { object, string, Asserts } from 'yup';

export const newEnergyTypeSchema= object({
    name: string().required(),
});

export interface NewEnergyType extends Asserts<typeof newEnergyTypeSchema> {}

export interface EnergyType extends NewEnergyType {
    id: number;
}
