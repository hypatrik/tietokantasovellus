import { AuthenticatedUser } from 'core/AuthenticatedUser';
import { ICarRepository, IUserRepository } from 'core/intefaces';
import { IApiContext } from 'core/intefaces/IApiContext';
import { MockCarRepository } from 'repositories/car/MockCarRepository';
import { MockUserRepository } from 'repositories/user/MockUserRepository';
import { CarService } from 'services/CarService';
import { UserService } from 'services/UserService';

export class MockApiContext implements IApiContext {
    // services
    private _userService: UserService;
    private _carService: CarService;

    private _userRepository: IUserRepository;
    private _carRepository: ICarRepository;

    constructor (
        private user: AuthenticatedUser,
    ) {}
    
    get userService(): UserService {
        if (!this._userService) {
            this._userService = new UserService(this.userRepository, this.user);
        }

        return this._userService;
    }

    get carService(): CarService {
        if (!this._carService) {
            this._carService = new CarService(this.carRepository, this.user);
        }

        return this._carService; 
    }


    private get userRepository(): IUserRepository {
        if (!this._userRepository) {
            this._userRepository = new MockUserRepository();
        }

        return this._userRepository;
    }

    private get carRepository(): ICarRepository {
        if (!this._carRepository) {
            this._carRepository = new MockCarRepository();
        }

        return this._carRepository;
    }
}
