import { HttpError } from './HttpError';

export class MissingRoleError extends HttpError {
    public constructor () {
        super('Forbidden', 403)
    }
}
