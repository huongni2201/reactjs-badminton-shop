import authorizedAxiosInstance from '../utils/authorizedAxiosInstance';

const API_BASE = '/api/v1/carts';

export const getCart = async () => {
    const res = await authorizedAxiosInstance.get(API_BASE);
    return res.data;
}