import authorizedAxiosInstance from '../utils/authorizedAxiosInstance';

const API_BASE = '/api/v1/orders';

export const postOrder = async (formData) => {
    const res = await authorizedAxiosInstance.post(API_BASE, formData);
    return res.data;
}

export const getOrders = async (page, size, filter = '') => {
    const res = await authorizedAxiosInstance.get(API_BASE, {
        params: { page, size, filter }
    })
    return res.data
}