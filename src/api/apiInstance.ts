import axios from "axios";
import { useTokenStore } from "@storage";

const apiUrl = import.meta.env.VITE_API_URL;
const apiInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});


apiInstance.interceptors.request.use((config) => {
    const tokenStore = useTokenStore();
    const token = tokenStore.jwt;

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiInstance;
