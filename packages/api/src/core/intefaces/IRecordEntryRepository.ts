import { NewRefuel, NewTrip, Refuel, Trip } from '@drivery/shared';

export type SomeRecordEntry = Refuel | Trip;

export type SomeNewRecordEntry = (NewRefuel & { totalPrice: number }) | NewTrip;

export interface IRecordEntryRepository {
    get (id: number, userId: number): Promise<SomeRecordEntry>;
    getByCar (carId: number, userId: number, offset: number, limit: number): Promise<SomeRecordEntry[]>;
    create (carId: number, newRecord: SomeNewRecordEntry, userId: number): Promise<SomeRecordEntry>;
}
