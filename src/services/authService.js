import authorizedAxiosInstance from '../utils/authorizedAxiosInstance';


export const postLogin = async (formData) => {
    const res = await authorizedAxiosInstance.post("/api/v1/auth/login", formData)
    return res?.data;
}

export const postRegister = async (formData) => {
    const res = await authorizedAxiosInstance.post("/api/v1/auth/register", formData)
    return res?.data;
}

export const postLogout = async () => {
    return await authorizedAxiosInstance.post('/api/v1/auth/logout');
};

export const refreshTokenAPI = async () => {
    return await authorizedAxiosInstance.get('/api/v1/auth/refresh')
}


