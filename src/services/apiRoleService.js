import authorizedAxiosInstance from '../utils/authorizedAxiosInstance';



export const getAllRoles = async () => {
    const res = await authorizedAxiosInstance.get('/api/v1/roles')
    return res.data;
}