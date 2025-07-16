import authorizedAxiosInstance from '../utils/authorizedAxiosInstance';

const API_BASE = '/api/v1/categories';

export const getAllCategories = async () => {
    const res = await authorizedAxiosInstance.get(API_BASE);
    return res.data;
}