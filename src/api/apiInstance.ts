import axios from "axios";
import { useCookies } from "@vueuse/integrations/useCookies";

const apiUrl = import.meta.env.VITE_API_URL;
const apiInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
});


apiInstance.interceptors.request.use((config) => {
    const cookies = useCookies();
    const jwt = cookies.get('ultra-shop-token');
    const token = jwt;

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiInstance;
