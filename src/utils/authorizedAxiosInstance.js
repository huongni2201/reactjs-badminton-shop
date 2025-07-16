import axios from "axios";
import { BASE_URL } from "./constants";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { postLogout, refreshTokenAPI } from "../services/authService";

const authorizedAxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 60 * 60, // 1h
    withCredentials: true
});

authorizedAxiosInstance.interceptors.request.use(config => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error => Promise.reject(error));

let refreshTokenPromise = null;

authorizedAxiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Nếu nhận lỗi 410 (token hết hạn)
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!refreshTokenPromise) {
                refreshTokenPromise = refreshTokenAPI()
                    .then(res => {
                        const accessToken = res?.data?.data.access_token;
                        authorizedAxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    })
                    .catch(err => {
                        return postLogout().then(() => {
                            localStorage.removeItem('userInfo');
                            location.href = '/login';
                        });
                    })
                    .finally(() => {
                        refreshTokenPromise = null;
                    });
            }

            return refreshTokenPromise.then(() => authorizedAxiosInstance(originalRequest));
        }

        // Không phải lỗi token, hiển thị toast
        if (error.response?.status !== 400) {
            toast.error(error.response?.data?.message || error.message);
        }

        return Promise.reject(error);
    }
);

export default authorizedAxiosInstance;
