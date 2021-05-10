import { Car } from '@drivery/shared';
import { router } from 'core';
import { MockApiContext } from 'core/apiContext/MockApiContext';
import { BadRequestError, NotFoundError } from 'core/errors';
import { ForbiddenError } from 'core/errors/ForbiddenError';
import { createMockUser } from 'core/testUtils';
import { resetCarsMock } from 'repositories/car/MockCarRepository';

import './car';

beforeEach(() => {
    resetCarsMock();
})

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


test('get own car by id as register-number', async () => {
    const car = await router.onRequest<Car>(
        'GET',
        '/api/car/:id',
        {
            pathParams: {
                id: 'abc-123',
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

test('create car missing data', async () => {
    expect(router.onRequest<Car>(
        'POST',
        '/api/car',
        {
            pathParams: {},
            searchParams: {},
            body: {
                register: 'DNE-404'
            }
        },
        new MockApiContext(createMockUser(3))
    )).rejects.toThrow(BadRequestError);

    expect(router.onRequest<Car>(
        'GET',
        '/api/car/:id',
        {
            pathParams: {
                id: 'DNE-404',
            },
            searchParams: {},
        },
        new MockApiContext(createMockUser(3))
    )).rejects.toThrow(NotFoundError);

});

test('create car non existing enery type', async () => {
    expect(router.onRequest<Car>(
        'POST',
        '/api/car',
        {
            pathParams: {},
            searchParams: {},
            body: {
                register: 'DNE-404',
                energyTypeId: 9000,
                name: 'Foo'
            }
        },
        new MockApiContext(createMockUser(3))
    )).rejects.toThrow(BadRequestError);

    expect(router.onRequest<Car>(
        'GET',
        '/api/car/:id',
        {
            pathParams: {
                id: 'DNE-404',
            },
            searchParams: {},
        },
        new MockApiContext(createMockUser(3))
    )).rejects.toThrow(NotFoundError);

});

test('create car existing register number', async () => {
    expect(router.onRequest<Car>(
        'POST',
        '/api/car',
        {
            pathParams: {},
            searchParams: {},
            body: {
                register: 'abc-123',
                energyTypeId: 2,
                name: 'Foo'
            }
        },
        new MockApiContext(createMockUser(3))
    )).rejects.toThrow(ForbiddenError);
});

test('update car', async () => {
    const { id } = await router.onRequest<Car>(
        'POST',
        '/api/car',
        {
            pathParams: {},
            searchParams: {},
            body: {
                register: 'MOD-200',
                energyTypeId: 1,
                name: 'Modify'
            }
        },
        new MockApiContext(createMockUser(3))
    );

    const modifiedCar = await router.onRequest<Car>(
        'PATCH',
        '/api/car/:id',
        {
            pathParams: {
                id: id.toString(),
            },
            searchParams: {},
            body: {
                name: 'Modified'
            }
        },
        new MockApiContext(createMockUser(3))
    );

    expect(modifiedCar.id).toBe(id);
    expect(modifiedCar.name).toBe('Modified');

    const fromPersitance = await router.onRequest<Car>(
        'GET',
        '/api/car/:id',
        {
            pathParams: {
                id: id.toString(),
            },
            searchParams: {},
        },
        new MockApiContext(createMockUser(3))
    );

    expect(fromPersitance.id).toBe(id);
    expect(fromPersitance.name).toBe('Modified');
});


test('update car non existing car', async () => {
    expect(router.onRequest<Car>(
        'PATCH',
        '/api/car/:id',
        {
            pathParams: {
                id: 'DNE-200',
            },
            searchParams: {},
            body: {
                name: 'Modified'
            }
        },
        new MockApiContext(createMockUser(3)))
    ).rejects.toThrow(NotFoundError);
});

test('update car some elses car', async () => {
    expect(router.onRequest<Car>(
        'PATCH',
        '/api/car/:id',
        {
            pathParams: {
                id: '1',
            },
            searchParams: {},
            body: {
                name: 'Modified'
            }
        },
        new MockApiContext(createMockUser(3)))
    ).rejects.toThrow(NotFoundError);
});


test('update car with empty payload', async () => {
    expect(router.onRequest<Car>(
        'PATCH',
        '/api/car/:id',
        {
            pathParams: {
                id: '1',
            },
            searchParams: {},
            body: {}
        },
        new MockApiContext(createMockUser(3)))
    ).rejects.toThrow(BadRequestError);
});

test('update car with invalid payload', async () => {
    expect(router.onRequest<Car>(
        'PATCH',
        '/api/car/:id',
        {
            pathParams: {
                id: '1',
            },
            searchParams: {},
            body: {
                name: true,
            }
        },
        new MockApiContext(createMockUser(3)))
    ).rejects.toThrow(BadRequestError);
});

test('update car with extra fields', async () => {

    const { id, energyType, register } = await router.onRequest<Car>(
        'POST',
        '/api/car',
        {
            pathParams: {},
            searchParams: {},
            body: {
                register: 'MOD-200',
                energyTypeId: 1,
                name: 'Modify'
            }
        },
        new MockApiContext(createMockUser(3))
    );
    
    const modifiedCar = await router.onRequest<Car>(
        'PATCH',
        '/api/car/:id',
        {
            pathParams: {
                id: id.toString(),
            },
            searchParams: {},
            body: {
                name: 'Modified',
                register: 'MOD-300',
                energyTypeId: 2,
                id: 42,
            }
        },
        new MockApiContext(createMockUser(3))
    );
    
    expect(modifiedCar.id).toBe(id);
    expect(modifiedCar.name).toBe('Modified');
    expect(modifiedCar.energyType).toBe(energyType);
    expect(modifiedCar.register).toBe(register);
    
    const fromPersitance = await router.onRequest<Car>(
        'GET',
        '/api/car/:id',
        {
            pathParams: {
                id: id.toString(),
            },
            searchParams: {},
        },
        new MockApiContext(createMockUser(3))
    );
    
    expect(fromPersitance.id).toBe(id);
    expect(fromPersitance.name).toBe('Modified');
    expect(fromPersitance.energyType).toBe(energyType);
    expect(fromPersitance.register).toBe(register);
});
