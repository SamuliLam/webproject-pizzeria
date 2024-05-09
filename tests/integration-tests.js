import {getProducts, getOrders, postOrder, getUserById, postLogin} from "../scripts/api/fetchCalls";
const axios = require('axios');
beforeEach(() => {
    fetch.resetMocks();
});

test("getProducts should return an Array of products", async () => {
    fetch.mockResponseOnce(JSON.stringify([{id: 1, name: 'Product 1'}, {id: 2, name: 'Product 2'}]));

    const products = await getProducts();
    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBe(2);
});

test("getOrders should return an Array of orders", async () => {
    fetch.mockResponseOnce(JSON.stringify([{id: 1, status: 'processing'}, {id: 2, status: 'processing'}]));

    const orders = await getOrders();
    expect(Array.isArray(orders)).toBeTruthy();
    expect(orders.length).toBeGreaterThan(0);
});

test("postOrder should return a boolean if the order was successful", async () => {
    fetch.mockResponseOnce(JSON.stringify({ success: true }));

    const user = {id: 1};
    const address = "Test address";
    const items = [{product_id: 1}, {product_id: 2}, {product_id: 3}];
    const totalPriceValue = 100;
    const boolean = await postOrder(user, address, items, totalPriceValue);
    expect(boolean).toBeTruthy();
});

test("getUserById should return an object with user data", async () => {
    fetch.mockResponseOnce(JSON.stringify({
        id: 24,
        first_name: "jest",
        last_name: "test",
        email: "jest.test@mail.com",
        phone: "test",
        address: "0",
        role: "user",
        password: "password"
    }));

    const user = await getUserById(24);
    delete user.password;
    const expectedUser = {
        id: 24,
        first_name: "jest",
        last_name: "test",
        email: "jest.test@mail.com",
        phone: "test",
        address: "0",
        role: "user"
    };
    expect(user).toEqual(expectedUser);
});
describe("postLogin for valid and invalid credentials", () => {
    test("postLogin should return an object with a token and user data", async () => {
        fetch.mockResponseOnce(JSON.stringify({
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
        }));

        const email = "jest.test@mail.com";
        const password = "12345";
        const data = await postLogin(email, password);
        expect(data.token).toBeTruthy();
        expect(data.user).toBeTruthy();
    });
    test("postLogin should return an object with an error message", async () => {
        fetch.mockResponseOnce(JSON.stringify({
            message: "Incorrect email or password"
        }));

        const email = "jest.test@mail.com";
        const password = "wrongpassword";
        const data = await postLogin(email, password);
        expect(data.message).toBe("Incorrect email or password");
    });
});

jest.mock('axios');
test('get users', async () => {
    axios.get.mockResolvedValue({
        status: 200,
        data: [{id: 1, name: 'User 1'}, {id: 2, name: 'User 2'}]
    });

    const response = await axios.get('http://10.120.32.55/app/api/v1/users');
    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array);
});