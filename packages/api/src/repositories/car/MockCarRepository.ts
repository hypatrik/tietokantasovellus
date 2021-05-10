import { Car, EnergyType, NewCar, Refuel, UpdateCar } from '@drivery/shared';
import { BadRequestError, NotFoundError } from 'core/errors';
import { ForbiddenError } from 'core/errors/ForbiddenError';
import { ICarRepository } from 'core/intefaces';
import { mockUsers } from 'repositories/user/MockUserRepository';

let enegryTypes: EnergyType[] = [];
let reFuels: Refuel[] = []
let mockCars: Car[] = [];
let mockRegisterIndex: Record<string, number> = {};

export const resetCarsMock = () => {
    enegryTypes = [
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
    
    reFuels = [
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
    
    mockCars = [
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
    
    mockRegisterIndex = {
        'abc-123': 1,
    }
}

resetCarsMock();

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

    async create (newCar: NewCar, userId: number): Promise<Car> {
        const energyType = enegryTypes[newCar.energyTypeId];
        const user = mockUsers[userId];

        if (mockRegisterIndex[newCar.register]) {
            throw new ForbiddenError('Register number already exists');
        }

        if (!energyType) {
            throw new BadRequestError('Invalid energy type');
        }

        const nextIndex = mockCars.length;
        mockCars.push({
            ...newCar,
            id: nextIndex,
            createdAt: Date.now(),
            modifiedAt: Date.now(),
            refuels: [],
            users: [ user ],
            owners: [ user ],
            energyType,
        });

        return mockCars[nextIndex];
    }

    async update (id: string | number, updateCar: UpdateCar, userId: number) {
        const car = await this.get(id, userId);

        mockCars[id] = {
            ...car,
            ...updateCar,
        };

        return mockCars[id];
    }
}
