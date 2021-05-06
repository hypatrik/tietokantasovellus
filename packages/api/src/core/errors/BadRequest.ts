import { HttpError } from './HttpError';

export class BadRequestError extends HttpError {
    public constructor () {
        super('Bad request', 400)
    }
}
