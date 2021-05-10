import { NewCar, newCarSchema } from '@drivery/shared';
import { AuthenticatedUser } from 'core/AuthenticatedUser';
import { BadRequestError } from 'core/errors';
import { ICarRepository } from 'core/intefaces';

export class CarService {
    constructor (
        private carRepository: ICarRepository,
        private user: AuthenticatedUser,
    ) {}

    async get(id: number | string) {
        if (this.user.hasRole('admin')) {
            return this.carRepository.get(id);
        }

        return this.carRepository.get(id, this.user.userId);
    }

    async create (newCar: NewCar) {
        try {
            const validatedCar = await newCarSchema.validate(newCar, {
                stripUnknown: true,
            });

            return this.carRepository.create(validatedCar, this.user.userId);
        } catch (error) {
            throw new BadRequestError();
        }
    }
}