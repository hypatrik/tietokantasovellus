import { NewCar, newCarSchema, UpdateCar, updateCarSchema } from '@drivery/shared';
import { AuthenticatedUser } from 'core/AuthenticatedUser';
import { BadRequestError } from 'core/errors';
import { ICarRepository } from 'core/intefaces';
import cleanDeep from 'clean-deep';

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
        let validatedCar: NewCar;

        try {
            validatedCar = await newCarSchema.validate(newCar, {
                stripUnknown: true,
            });
        } catch (error) {
            throw new BadRequestError();
        }

        return this.carRepository.create(validatedCar, this.user.userId);
    }

    async update (id: number | string, updateCar: UpdateCar) {
        let validatedCar: UpdateCar;

        try {
            validatedCar = await updateCarSchema.validate(cleanDeep(updateCar), {
                stripUnknown: true,
            });
        } catch (error) {
            throw new BadRequestError();
        }

        if (!Object.keys(validatedCar).length) {
            throw new BadRequestError();
        }

        return this.carRepository.update(id, validatedCar, this.user.userId);
    }
}