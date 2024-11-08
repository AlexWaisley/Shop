import {
    UserLoginRequest,
    OrderItemDto,
    User,
    UserRegisterRequest,
    UserPasswordUpdateRequest,
    UserUpdateInfoRequest,
    Category,
    ProductDto,
    Product,
    ProductImage,
    CategoryCreateRequest,
    ProductCreateRequest,
    OrderDto,
    OrderFull,
    ShippingAddress,
    CartItemDto,
    PreviewCreateRequest
} from "@models";
import axios from "axios"
import { CartDto } from "../models/CartDto";
const apiUrl = import.meta.env.VITE_API_URL;
const apiInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});
import { useSessionStore } from "@storage";
import { CartItemAddRequest } from "../models/requests/CartItemAddRequest";
import { ProductUpdateRequest } from "../models/requests/ProductUpdateRequest";


export const api = {
    async Login(userLoginRequest: UserLoginRequest): Promise<User | null> {
        try {
            const { data, status } = await apiInstance.post(`/login`, userLoginRequest);
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async Register(userRegisterRequest: UserRegisterRequest): Promise<User | null> {
        try {
            const { data, status } = await apiInstance.post(`/register`, userRegisterRequest);
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

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

    async UpdatePassword(userPasswordUpdateRequest: UserPasswordUpdateRequest): Promise<boolean | null> {
        const sessionStore = useSessionStore();
        try {
            const { status } = await apiInstance.post(`/user/password`, userPasswordUpdateRequest, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return status === 200;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async UpdateInfo(userUpdateInfoRequest: UserUpdateInfoRequest): Promise<boolean | null> {
        const sessionStore = useSessionStore();
        try {
            const { status } = await apiInstance.post(`/user/info`, userUpdateInfoRequest, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return status === 200;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async GetCart(): Promise<CartDto | null> {
        const sessionStore = useSessionStore();
        try {
            const { data, status } = await apiInstance.get(`/user/cart/info`, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async AddToCart(cartItemDto: CartItemAddRequest): Promise<boolean | null> {
        const sessionStore = useSessionStore();
        try {
            const { status } = await apiInstance.post(`/user/cart/item`, cartItemDto, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return status === 200;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async RemoveFromCart(cartItemId: string): Promise<boolean | null> {
        const sessionStore = useSessionStore();
        try {
            const { status } = await apiInstance.delete(`/user/cart/item/${cartItemId}`, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return status === 200;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async LoadCategories(parentCategoryId: number): Promise<Category[] | null> {
        try {
            const { data, status } = await apiInstance.get(`/categories/id=${parentCategoryId}`);
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async AddNewCategory(categoryCreateRequest: CategoryCreateRequest): Promise<boolean | null> {
        const sessionStore = useSessionStore();
        try {
            const { status } = await apiInstance.post(`/categories`, categoryCreateRequest, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return status === 200;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async GetProductsByCategoryId(categoryId: number, count: number, offset: number): Promise<ProductDto[] | null> {
        try {
            const { data, status } = await apiInstance.get(`/products/category/id=${categoryId}/count=${count}&offset=${offset}`);
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async GetProductInfoById(id: string): Promise<Product | null> {
        try {
            const { data, status } = await apiInstance.get(`/products/id=${id}/full`);
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async GetProductList(count: number, offset: number): Promise<Product[] | null> {
        try {
            const { data, status } = await apiInstance.get(`/products/general/count=${count}&offset=${offset}`);
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async GetProductPreviewsById(id: string, count: number, offset: number): Promise<ProductImage[] | null> {
        try {
            const { data, status } = await apiInstance.get(`/products/id=${id}/previews/count=${count}&offset=${offset}`);
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async GetPreviewById(id: number): Promise<string | null> {
        try {
            const { data, status } = await apiInstance.get(`/files/${id}`, { responseType: 'arraybuffer' });
            console.log('[api]', 'User valid status:', status);
            return URL.createObjectURL(new Blob([data]));
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async UpdateProductInfo(productUpdateRequest: ProductUpdateRequest): Promise<boolean | null> {
        const sessionStore = useSessionStore();
        try {
            const { status } = await apiInstance.post(`/products/update`, productUpdateRequest, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return status === 200;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async AddNewProduct(productCreateRequest: ProductCreateRequest): Promise<boolean | null> {
        const sessionStore = useSessionStore();
        try {
            const { status } = await apiInstance.post(`/products/add`, productCreateRequest, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return status === 200;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async GetOrder(id: string): Promise<OrderFull | null> {
        const sessionStore = useSessionStore();
        try {
            const { data, status } = await apiInstance.get(`/orders/${id}/all/info`, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async GetUserOrders(): Promise<OrderDto[] | null> {
        const sessionStore = useSessionStore();
        try {
            const { data, status } = await apiInstance.get(`/orders/user`, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async GetAllOrders(): Promise<OrderDto[] | null> {
        const sessionStore = useSessionStore();
        try {
            const { data, status } = await apiInstance.get(`/orders/all`, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async GetOrdersPart(offset: number, count: number): Promise<OrderDto[] | null> {
        const sessionStore = useSessionStore();
        try {
            const { data, status } = await apiInstance.get(`/orders/all/offset=${offset}&limit=${count}`, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async AddNewPhoto(formFile: FormData): Promise<number | null> {
        const sessionStore = useSessionStore();
        try {
            const { data, status } = await apiInstance.post(`/files`, formFile, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt,
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async AddNewProductPhoto(previewCreateRequest: PreviewCreateRequest): Promise<boolean | null> {
        const sessionStore = useSessionStore();
        try {
            const { status } = await apiInstance.post(`/products/add/preview`, previewCreateRequest, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return status === 200;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async UpdateOrderStatus(orderId: string, newStatus: string): Promise<boolean | null> {
        const sessionStore = useSessionStore();
        try {
            const { status } = await apiInstance.post(`/orders/update`, { orderId, status: newStatus }, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return status === 200;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async GetOrderItems(orderId: string): Promise<OrderItemDto[] | null> {
        const sessionStore = useSessionStore();
        try {
            const { data, status } = await apiInstance.get(`/orders/all/${orderId}/info/items`, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async CreateOrderRecord(shippingAddressId: number): Promise<boolean | null> {
        const sessionStore = useSessionStore();
        try {
            const { status } = await apiInstance.post(`/orders/create/${shippingAddressId}`, {}, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return status === 200;
        }
        catch (e) {
            console.log(e);
            return null;
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

    async UpdateCartItemQuantity(cartItemDto: CartItemDto): Promise<boolean> {
        const sessionStore = useSessionStore();
        try {
            const { status } = await apiInstance.post(`/user/cart/update`, cartItemDto, {
                headers: {
                    "Authorization": "Bearer " + sessionStore.jwt
                }
            });
            console.log('[api]', 'User valid status:', status);
            return status === 200;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }


};