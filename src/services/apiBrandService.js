import authorizedAxiosInstance from '../utils/authorizedAxiosInstance';

const API_BASE = '/api/v1/brands';

export const getAllBrands = async () => {
    const res = await authorizedAxiosInstance.get(API_BASE);
    return res.data;
}