import { getProducts, getOrders, getUserById, postLogin, postOrder } from './fetchCalls.js';

test('getProducts should return an array of products', async () => {
    const mockResponse = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockResponse),
        })
    );

    const result = await getProducts();

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
});

test('getOrders should return an array of orders', async () => {
    const mockResponse = [{ id: 1, status: 'processing' }, { id: 2, status: 'processing' }];
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockResponse),
        })
    );

    const result = await getOrders();

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
});

test('getUserById should return user data', async () => {
    const mockResponse = {
        id: 24,
        first_name: "jest",
        last_name: "test",
        email: "jest.test@mail.com",
        phone: "test",
        address: "0",
        role: "user",
        password: "password"
    };
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockResponse),
        })
    );

    const result = await getUserById(24);

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
});

test('postLogin should return a token and user data', async () => {
    const mockResponse = {
        token: "mockToken",
        user: {
            id: 24,
            first_name: "jest",
            last_name: "test",
            email: "jest.test@mail.com",
            phone: "test",
            address: "0",
            role: "user"
        }
    };
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockResponse),
        })
    );

    const email = "jest.test@mail.com";
    const password = "12345";
    const result = await postLogin(email, password);

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
});

test('postOrder should return true if the order was successful', async () => {
    const mockResponse = { success: true };
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockResponse),
        })
    );

    const user = {id: 1};
    const address = "Test address";
    const items = [{product_id: 1}, {product_id: 2}, {product_id: 3}];
    const totalPriceValue = 100;
    const result = await postOrder(user, address, items, totalPriceValue);

    expect(result).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);
});