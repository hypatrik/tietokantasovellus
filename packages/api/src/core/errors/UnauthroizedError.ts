export interface UnauthorizedErrorConstructor extends ErrorConstructor {
    new(message?: string): UnauthorizedError;
}
export class UnauthorizedError extends Error {}
