import { HttpError } from './HttpError';

export class ForbiddenError extends HttpError {
    public constructor (message = 'Forbidden') {
        super(message, 404)
    }
}
