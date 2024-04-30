export const getOrders = async () => {
    try {
        const response = await fetch('http://10.120.32.55/app/api/v1/orders');
        const data = await response.json();
        if (response.ok) {
            console.log(data)
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getProducts = async () => {
    try {
        const response = await fetch('http://10.120.32.55/app/api/v1/products');
        const data = await response.json();
        if (response.ok) {
            console.log(data)
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getOrderItemsByOrderId = async (id) => {
    try {
        const response = await fetch(`http://10.120.32.55/app/api/v1/orders/${id}/items`);
        const data = await response.json();
        if (response.ok) {
            console.log(data)
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getUserById = async (id) => {
    try {
        const response = await fetch(`http://10.120.32.55/app/api/v1/users/${id}`);
        const data = await response.json();
        if (response.ok) {
            console.log(data)
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}