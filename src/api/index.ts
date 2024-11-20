import {
    ShippingAddress
} from "@models";
import axios from "axios"
const apiUrl = import.meta.env.VITE_API_URL;
const apiInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});


import * as userApi from "./user";
import * as cartApi from "./cart";
import * as ordersApi from "./orders";
import * as productsApi from "./products";
import * as categoriesApi from "./categories";
import * as imagesApi from "./images";

export {
    userApi,
    cartApi,
    ordersApi,
    productsApi,
    categoriesApi,
    imagesApi
};


export const api = {
    async RefreshToken(): Promise<boolean> {
        try {
            const { status } = await apiInstance.post(`/refresh`);
            console.log('[api]', 'User valid status:', status);
            return status === 200;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    },

    async GetAddresses(): Promise<ShippingAddress[] | null> {
        try {
            const { data, status } = await apiInstance.get(`/addresses`);
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
};