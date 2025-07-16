import authorizedAxiosInstance from '../utils/authorizedAxiosInstance';

const API_SINGLE_FILE = '/api/v1/file';
const API_MULTIPLE_FILE = '/api/v1/files'

export const postUploadAvatarFile = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("folder", "avatar");

    const res = await authorizedAxiosInstance.post(API_SINGLE_FILE, form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return res.data;
};

export const postUploadMultipleProductFile = async (files) => {
    const form = new FormData();

    files.forEach(file => {
        form.append("files", file);
    });

    form.append("folder", "product");

    const res = await authorizedAxiosInstance.post(API_MULTIPLE_FILE, form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return res.data;
};