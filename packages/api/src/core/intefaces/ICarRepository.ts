import { Car } from "@drivery/shared";

export interface ICarRepository {
    get (id: number | string, userId?: number): Promise<Car>;
}