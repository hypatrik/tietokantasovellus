import { Car } from '@drivery/shared';
import { router } from 'core';
import { MockApiContext } from 'core/apiContext/MockApiContext';
import { createMockUser } from 'core/testUtils';

import './car';

test('should be true', async () => {
    const car = await router.onRequest<Car>(
        'GET',
        '/api/car/:id',
        {
            pathParams: {
                id: '1',
            },
            searchParams: {},
        },
        new MockApiContext(createMockUser(1))
    );

    expect(car.id).toBe(1);
});