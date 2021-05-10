import { Car, NewCar } from "@drivery/shared";

export interface ICarRepository {
    get (id: number | string, userId?: number): Promise<Car>;
    create (newCar: NewCar, userId: number): Promise<Car>;
}