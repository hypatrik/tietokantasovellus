import { Car, NewCar, UpdateCar } from "@drivery/shared";

export interface ICarRepository {
    get (id: number | string, userId?: number): Promise<Car>;
    create (newCar: NewCar, userId: number): Promise<Car>;
    update (id: number | string, newCar: UpdateCar, userId: number): Promise<Car>;
}