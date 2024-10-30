import { defineStore } from "pinia"
import { useSessionStore } from "./SessionStore";
import { OrderDto, OrderFull, OrderItemDto } from "@models";
import toastr from 'toastr';
import { ref } from "vue";
import { api } from "../api";
import { useCartStore } from "./CartStore";


export const useOrderRecordStore = defineStore('orderRecordStore', () => {

    const cartStore = useCartStore();
    const sessionStore = useSessionStore();

    const orderList = ref<OrderDto[] | null>(null);
    const orderFullList = ref<OrderFull[] | null>(null);
    const orderItemsList = ref<OrderItemDto[] | null>(null);

    const loadUserOrders = async () => {
        const result = await api.GetUserOrders();
        if (result === null || orderList.value === null) {
            orderList.value = []
            return;
        }
        orderList.value = result;
    }

    const loadFullOrderInfo = async (orderId: string) => {
        const result = await api.GetOrder(orderId);
        if (orderFullList.value === null) {
            orderFullList.value = [];
        }
        if (result === null) {
            return;
        }
        orderFullList.value.push(result);
    }

    const loadOrderItems = async (orderId: string) => {
        const result = await api.GetOrderItems(orderId);
        if (orderItemsList.value === null) {
            orderItemsList.value = [];
        }
        if (result === null) {
            return;
        }
        orderItemsList.value.push(...result);
    };

    const orderConfirmed = async (shippingAddressId: number) => {
        if (sessionStore.currUser === null) {
            toastr.error("Sign in account");
            return;
        }
        if (!sessionStore.currUser.email.isActive) {
            toastr.error("Activate your email, so we can contact with you");
            return;
        }

        const result = await api.CreateOrderRecord(shippingAddressId);

        if (!result) {
            toastr.error("Something went wrong");
            return;
        }

        cartStore.loadCart();

        toastr.success("Order sended");
    }
    return {
        orderConfirmed,
        loadUserOrders,
        loadFullOrderInfo,
        loadOrderItems

    };
});