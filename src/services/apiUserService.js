import authorizedAxiosInstance from '../utils/authorizedAxiosInstance';

const API_BASE = '/api/v1/users';

export const getAllUsers = async (page = 1, size = 10, filter = {}) => {
    let filterQuery = '';

    if (filter) {
        const filterConditions = [];

        if (filter.search) {
            filterConditions.push(`fullName ~ '${filter.search}'`);
        }
        if (filter.status) {
            filterConditions.push(`status : '${filter.status}'`);
        }
        if (filter.role) {
            filterConditions.push(`role.id : '${filter.role}'`)
        }
        filterQuery = filterConditions.join(" and ");
    }

    const res = await authorizedAxiosInstance.get(API_BASE,
        {
            params: { page, size, filter: filterQuery }
        }
    );
    return res.data;
}

export const getUserInfo = async () => {
    const res = await authorizedAxiosInstance.get(`${API_BASE}/info`);
    return res.data;
}

export const deleteUserById = async (id) => {
    const res = await authorizedAxiosInstance.delete(`${API_BASE}/${id}`)
    return res.data
}

export const postCreateNewUser = async (formData) => {
    try {
        const res = await authorizedAxiosInstance.post(API_BASE, formData);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const putUser = async (formData, id) => {
    try {
        const res = await authorizedAxiosInstance.put(`${API_BASE}/${id}`, formData);
        return res.data;
    } catch (error) {
        throw error;
    }
}




