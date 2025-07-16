import authorizedAxiosInstance from '../utils/authorizedAxiosInstance';

const API_BASE = '/api/v1/cart-items';


export const deleteCartItem = async (cartItemId) => {
    const res = await authorizedAxiosInstance.delete(`${API_BASE}/${cartItemId}`)

    return res?.data;
}

export const clearCart = async () => {
    const res = authorizedAxiosInstance.delete(API_BASE)

    return res?.data;
}

export const postCartItem = async (reqCartItem) => {
    const res = await authorizedAxiosInstance.post(API_BASE, reqCartItem)

    return res?.data;
}

export const putCartItemQuantity = async (cartItemId, quantity) => {
    const res = await authorizedAxiosInstance.put(`${API_BASE}/${cartItemId}`, {
        quantity: quantity
    })
    return res?.data;
};
