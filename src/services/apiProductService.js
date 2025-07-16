import authorizedAxiosInstance from '../utils/authorizedAxiosInstance';

const API_BASE = '/api/v1/products';
const API_BASE_ADMIN = '/api/v1/admin/products'

export const getAllProductsAdmin = async (page = 1, size = 10, filter = {}) => {
    let filterQuery = '';

    if (filter) {
        const filterConditions = [];

        if (filter.search) {
            filterConditions.push(`name ~ '${filter.search}'`);
        }
        if (filter.status) {
            filterConditions.push(`status : '${filter.status}'`);
        }
        if (filter.brandId) {
            filterConditions.push(`brand.id : ${filter.brandId}`);
        }
        if (filter.categoryId) {
            filterConditions.push(`category.id : ${filter.categoryId}`);
        }
        filterQuery = filterConditions.join(" and ");
    }

    const res = await authorizedAxiosInstance.get(API_BASE_ADMIN,
        {
            params: { page, size, filter: filterQuery }
        }
    );
    return res.data;
};

export const getAllProducts = async (page = 1, size = 10, filter = '') => {
    // Encode ONLY '[' and ']' safely
    const safeFilter = filter.replace(/\[/g, '%5B').replace(/\]/g, '%5D');

    const url = `${API_BASE}?page=${page}&size=${size}&filter=${safeFilter}`;

    const res = await authorizedAxiosInstance.get(url);
    return res.data;
};



export const getProductById = async (id) => {
    const res = await authorizedAxiosInstance.get(`${API_BASE}/${id}`);
    return res.data;
};

export const postCreateProduct = async data => {
    const res = await authorizedAxiosInstance.post(API_BASE, data);
    return res.data;
};

export const putUpdateProduct = async (id, data) => {
    const res = await authorizedAxiosInstance.put(`${API_BASE}/${id}`, data);
    return res.data;
};

export const deleteProductById = async (id) => {
    const res = await authorizedAxiosInstance.delete(`${API_BASE}/${id}`)
    return res.data
}
