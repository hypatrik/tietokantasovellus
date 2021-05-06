import { BadRequestError } from 'core/errors';
import { router } from 'core/router';

router.get('/api/car/:id', (event, context) => {
    const id = Number(event.pathParams.id);
    if (Number.isNaN(id)) {
        throw new BadRequestError();
    }

    return context.carService.get(event.pathParams.id);
});
