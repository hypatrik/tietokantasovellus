import { Car, EnergyType, Refuel } from '@drivery/shared';
import { NotFoundError } from 'core/errors';
import { ICarRepository } from 'core/intefaces';
import { mockUsers } from 'repositories/user/MockUserRepository';

const enegryTypes: EnergyType[] = [
    null,
    {
        id: 1,
        name: 'Petrol',
    },
    {
        id: 2,
        name: 'Diesel',
    },
    {
        id: 3,
        name: 'Gas',
    },
];

const reFuels: Refuel[] = [
    null,
    {
        id: 1,
        trip: 120099,
        units: 1039,
        pricePerUnit: 1509,
        user: mockUsers[1],
        coordinates: {
            latitude: 60.2036,
            longitude: 24.8732,
        },
        createdAt: 1618231797417,
    }
]

const mockCars: Car[] = [
    null,
    {
        id: 1,
        name: 'Volvo',
        register: 'abc-123',
        energyType: enegryTypes[2],
        owners: [
            mockUsers[1]
        ],
        users: [
            mockUsers[1],
            mockUsers[2],
        ],
        refuels: [
            reFuels[1],
        ],
        createdAt: 1618231797417,
        modifiedAt: 1618231797417,
    },
];

const mockRegisterIndex = {
    'abc-123': 1,
}

export class MockCarRepository implements ICarRepository {
    async get (id: number | string, userId: number): Promise<Car> {
        let car: Car = mockCars[id] || mockCars[mockRegisterIndex[id]] || null;

        if (!car) {
            throw new NotFoundError();
        }

        if (userId && !car.users.some(u => u.id === userId)) {
            throw new NotFoundError();
        }

        return car;
    }
}
