import { object, number, Asserts } from 'yup';
import { User } from './User';

export const newRefuelSchema= object({
    trip: number().integer().required(),
    units: number().integer().required(), // open for extension, default litres 49,44 => 4944
    pricePerUnit: number().integer().required(), // 1,456 => 1459
    coordinates: object({
        latitude: number(), // 1,456 => 1459
        longitude: number(),
    }).nullable(),
});

export interface NewRefuel extends Asserts<typeof newRefuelSchema> {}

export interface Refuel extends NewRefuel {
    id: number;
    user: User;
    createdAt: number;
}
