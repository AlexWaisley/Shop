import { CartDto, CartItemAddRequest, CartItemDto } from "@models";
import apiInstance from "./apiInstance";
export const GetCart = async (): Promise<CartDto | null> => {
    try {
        const { data, status } = await apiInstance.get(`/user/cart/info`);
        console.log('[api]', 'User valid status:', status);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export const AddToCart = async (cartItemDto: CartItemAddRequest): Promise<boolean | null> => {
    try {
        const { status } = await apiInstance.post(`/user/cart/item`, cartItemDto);
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export const RemoveFromCart = async (cartItemId: string): Promise<boolean | null> => {
    try {
        const { status } = await apiInstance.delete(`/user/cart/item/${cartItemId}`);
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export const UpdateCartItemQuantity = async (cartItemDto: CartItemDto): Promise<boolean> => {
    try {
        const { status } = await apiInstance.post(`/user/cart/update`, cartItemDto);
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}