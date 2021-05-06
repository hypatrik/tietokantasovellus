import { Car } from '@drivery/shared';
import { router } from 'core';
import { MockApiContext } from 'core/apiContext/MockApiContext';
import { NotFoundError } from 'core/errors';
import { createMockUser } from 'core/testUtils';

import './car';

test('get own car by id', async () => {
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

test('get someone elses car by id', async () => {

    expect(router.onRequest<Car>(
        'GET',
        '/api/car/:id',
        {
            pathParams: {
                id: '1',
            },
            searchParams: {},
        },
        new MockApiContext(createMockUser(3))
    )).rejects.toThrow(NotFoundError);
});

test('get non existing car', async () => {

    expect(router.onRequest<Car>(
        'GET',
        '/api/car/:id',
        {
            pathParams: {
                id: '42',
            },
            searchParams: {},
        },
        new MockApiContext(createMockUser(1))
    )).rejects.toThrow(NotFoundError);
});

test('admin get someone elses car by id', async () => {
    const car = await router.onRequest<Car>(
        'GET',
        '/api/car/:id',
        {
            pathParams: {
                id: '1',
            },
            searchParams: {},
        },
        new MockApiContext(createMockUser(4))
    );

    expect(car.id).toBe(1);
});

