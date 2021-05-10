import { HttpError } from './HttpError';

export class BadRequestError extends HttpError {
    public constructor (message = 'Bad request') {
        super(message, 400)
    }
}
