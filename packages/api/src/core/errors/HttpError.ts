export abstract class HttpError extends Error {
    public constructor (
        message: string,
        public httpStatusCode: number = 500,
    ) {
        super(message);
    }

    public toResponse(): any {
        // todo
    }
}