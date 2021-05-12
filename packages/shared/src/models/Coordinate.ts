import { number, object } from 'yup';

export interface Coordinate {
    latitude: number;
    longitude: number;
}

export const coordinateSchema = object({
    latitude: number(),
    longitude: number(),
});
