import { object, number, string, Asserts } from 'yup';
import { Coordinate, coordinateSchema } from './Coordinate';
import { RecordEntry } from './RecordEntry';

export const newTripSchema= object({
    distance: number().integer(),
    trip: number().integer().required(),
    notes: string().required(), // open for extension, default litres 49,44 => 4944
    passengers: number().integer().required(), // 1,456 => 1459
    origin: coordinateSchema.nullable(),
    destination: coordinateSchema.nullable(),
    type: string().oneOf(['trip']).required(),
});

export interface NewTrip extends Asserts<typeof newTripSchema> {}

export interface Trip extends RecordEntry {
    distance?: number;
    trip: number;
    notes: string;
    passengers: number;
    type: 'trip';
    origin?: Coordinate;
    destination?: Coordinate;
}
