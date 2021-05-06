import { AuthenticatedUser } from 'core/AuthenticatedUser';
import { ICarRepository } from 'core/intefaces';

export class CarService {
    constructor (
        private carRepository: ICarRepository,
        private user: AuthenticatedUser,
    ) {}

    get(id: number | string) {
        if (this.user.hasRole('admin')) {
            return this.carRepository.get(id);
        }

        return this.carRepository.get(id, this.user.userId);
    }
}