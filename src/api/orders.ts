import { OrderDto, OrderFull, OrderItemDto } from "@models";
import apiInstance from "./apiInstance";

export const GetOrder = async (id: string): Promise<OrderFull | null> => {
    try {
        const { data, status } = await apiInstance.get(`/orders/${id}/all/info`);
        console.log('[api]', 'User valid status:', status);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

export const GetUserOrders = async (): Promise<OrderDto[] | null> => {
    try {
        const { data, status } = await apiInstance.get(`/orders/user`);
        console.log('[api]', 'User valid status:', status);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

export const GetAllOrders = async (): Promise<OrderDto[] | null> => {
    try {
        const { data, status } = await apiInstance.get(`/orders/all`);
        console.log('[api]', 'User valid status:', status);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

export const GetOrdersPart = async (offset: number, count: number): Promise<OrderDto[] | null> => {
    try {
        const { data, status } = await apiInstance.get(`/orders/all/offset=${offset}&limit=${count}`);
        console.log('[api]', 'User valid status:', status);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};


export const UpdateOrderStatus = async (orderId: string, newStatus: string): Promise<boolean | null> => {
    try {
        const { status } = await apiInstance.post(`/orders/update`, { orderId, status: newStatus });
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

export const GetOrderItems = async (orderId: string): Promise<OrderItemDto[] | null> => {
    try {
        const { data, status } = await apiInstance.get(`/orders/all/${orderId}/info/items`);
        console.log('[api]', 'User valid status:', status);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

export const CreateOrderRecord = async (shippingAddressId: number): Promise<boolean | null> => {
    try {
        const { status } = await apiInstance.post(`/orders/create/${shippingAddressId}`, {});
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};