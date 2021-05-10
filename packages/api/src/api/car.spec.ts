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

test('create car', async () => {
    const car = await router.onRequest<Car>(
        'POST',
        '/api/car',
        {
            pathParams: {},
            searchParams: {},
            body: {
                register: 'FOO-200',
                energyTypeId: 1,
                name: 'Foo'
            }
        },
        new MockApiContext(createMockUser(3))
    );

    expect(car.register).toBe('FOO-200');
    expect(car.energyType.id).toBe(1);
    expect(car.name).toBe('Foo');

    const fromPersitance = await router.onRequest<Car>(
        'GET',
        '/api/car/:id',
        {
            pathParams: {
                id: car.id.toString(),
            },
            searchParams: {},
        },
        new MockApiContext(createMockUser(3))
    );

    expect(fromPersitance.id).toBe(car.id);
});

