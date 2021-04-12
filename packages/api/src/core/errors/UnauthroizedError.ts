import { HttpError } from './HttpError';

export class UnauthorizedError extends HttpError {
    public constructor () {
        super('Unauthorized', 401)
    }
}
