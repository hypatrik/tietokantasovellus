import { CarService } from 'services/CarService';
import { UserService } from 'services/UserService';

export interface IApiContext {
    userService: UserService;
    carService: CarService;
}

