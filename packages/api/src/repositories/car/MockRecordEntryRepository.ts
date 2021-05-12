import { Refuel, Trip } from '@drivery/shared';
import { NotFoundError } from 'core/errors';
import { IRecordEntryRepository, SomeNewRecordEntry, SomeRecordEntry } from 'core/intefaces/IRecordEntryRepository';
import { mockUsers } from 'repositories/user/MockUserRepository';
import { MockCarRepository } from './MockCarRepository';

const createRefuel = (id: number, trip: number, units: number, pricePerUnit: number, user = 1): Refuel => ({
    id,
    trip,
    units,
    pricePerUnit,
    totalPrice: pricePerUnit * units,
    user: mockUsers[user],
    coordinates: {
        latitude: 60.2036,
        longitude: 24.8732,
    },
    createdAt: 1618231797417 + (10000 * id),
    type: 'refuel',
});

const createTrip = (id: number, distance: number, trip: number, passengers: number, notes: string, user = 1): Trip => ({
    id,
    trip,
    passengers,
    notes,
    distance,
    user: mockUsers[user],
    origin: {
        latitude: 60.2036,
        longitude: 24.8732,
    },
    destination: {
        latitude: 60.2036,
        longitude: 24.8732,
    },
    createdAt: 1618231797417 + (10000 * id),
    type: 'trip',
});


let recordEntries: SomeRecordEntry[] = []
let carRecordEntries: Array<number>[];
let recordEntriesCar: number[];


export const resetCarsMock = () => {
    recordEntries = [
        null,
        createRefuel(1, 120099, 1039, 1509),
        createTrip(2, 203, 120201, 2, 'Trip 1'),
        createTrip(3, 32, 120233, 1, 'Trip 2'),
        createTrip(4, 10, 120401, 1, 'Trip 3'),
        createRefuel(5, 12420, 1039, 1509),
    ];

    carRecordEntries = [
        null,
        [ 1, 2, 3, 4, 5 ],
    ]

    recordEntriesCar = [
        null,
        1, 1, 1, 1, 1
    ]
}

resetCarsMock();

export class MockRecordEntryRepository implements IRecordEntryRepository {
    constructor (
        private carRepository: MockCarRepository,
    ) {}

    async get (id: number, userId: number): Promise<SomeRecordEntry> {
        const car = await this.carRepository.get(recordEntriesCar[id], userId);
        if (!car) {
            throw new NotFoundError();
        }

        let entry: SomeRecordEntry = recordEntries[id] || null;


        if (!entry) {
            throw new NotFoundError();
        }

        return entry;
    }

    async getByCar (carId: number, userId: number, offset: number, limit: number): Promise<SomeRecordEntry[]> {
        const car = await this.carRepository.get(carId, userId);
        if (!car) {
            throw new NotFoundError();
        }

        const entries = [];

        for (let i = offset; i <= limit; i++) {
            if (!carRecordEntries?.[carId]?.[i]) break;
            entries.push(carRecordEntries[carId][i]);
        }

        return entries;
    }

    async create (carId: number, newRecord: SomeNewRecordEntry, userId: number): Promise<SomeRecordEntry> {
        const car = await this.carRepository.get(carId, userId);
        if (!car) {
            throw new NotFoundError();
        }

        if (!carRecordEntries[carId]) {
            carRecordEntries[carId] = [];
        }

        const nextIndex = recordEntries.length;

        recordEntries.push({
            ...newRecord,
            type: newRecord.type as any,
            id: nextIndex,
            createdAt: Date.now(),
            user: mockUsers[userId],
        });

        recordEntriesCar.push(carId);

        return recordEntries[nextIndex];
    }
}
