import { object, number, Asserts, string } from 'yup';
import { Coordinate, coordinateSchema } from './Coordinate';
import { RecordEntry } from './RecordEntry';

export const newRefuelSchema = object({
    trip: number().integer().required(),
    units: number().integer().required(), // open for extension, default litres 49,44 => 4944
    pricePerUnit: number().integer().required(), // 1,456 => 1459
    coordinates: coordinateSchema.nullable(),
    type: string().oneOf(['refuel']).required(),
});

export interface NewRefuel extends Asserts<typeof newRefuelSchema> {}

export interface Refuel extends RecordEntry {
    trip: number;
    units: number;
    pricePerUnit: number;
    totalPrice: number;
    coordinates: Coordinate;
    type: 'refuel';
}
