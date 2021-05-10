import { router } from 'core/router';

router.get('/api/car/:id', (event, context) => {
    return context.carService.get(event.pathParams.id);
});

router.post('/api/car', (event, context) => {
    return context.carService.create(event.body);
});
