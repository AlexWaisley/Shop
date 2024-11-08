import { defineStore } from "pinia"
import { useSessionStore } from "./SessionStore";
import { OrderDto, OrderFull, OrderItemDto } from "@models";
import toastr from 'toastr';
import { ref } from "vue";
import { api } from "../api";
import { useCartStore } from "./CartStore";
import Decimal from "decimal.js";
import { useDataStore } from "./DataStorage";


export const useOrderRecordStore = defineStore('orderRecordStore', () => {

    const cartStore = useCartStore();
    const sessionStore = useSessionStore();
    const dataStorage = useDataStore();

    const orderList = ref<OrderDto[] | null>(null);
    const orderFullList = ref<OrderFull[] | null>(null);
    const orderItemsList = ref<OrderItemDto[] | null>(null);
    const allOrders = ref<OrderDto[] | null>(null);

    const loadUserOrders = async () => {
        const result = await api.GetUserOrders();
        if (result === null) {
            orderList.value = []
            return;
        }
        orderList.value = result;
        orderList.value.forEach(async (x) => {
            await loadOrderItems(x.id);
        })
    }

    const loadAllOrders = async () => {
        if (allOrders.value === null) {
            allOrders.value = [];
        }
        const result = await api.GetAllOrders();
        if (result === null) {
            orderList.value = []
            return;
        }
        allOrders.value = result;
        allOrders.value.forEach(async (x) => {
            await loadOrderItems(x.id);
        })

    }

    const loadOrdersPart = async () => {
        if (allOrders.value === null) {
            allOrders.value = [];
        }
        const result = await api.GetOrdersPart(allOrders.value.length, 20);

        if (result === null) {
            return;
        }
        allOrders.value = result;
        allOrders.value.forEach(async (x) => {
            await loadOrderItems(x.id);
        })
    }

    const calcTotal = (orderId: string) => {
        if (orderItemsList.value === null) {
            return;
        }

        const orderItems = orderItemsList.value.filter(x => x.orderId === orderId);
        if (orderItems === undefined || orderItems.length === 0)
            return new Decimal(-1);


        return orderItems.reduce((acc, item) => {
            const productPrice = new Decimal(dataStorage.getProductPriceById(item.productId));
            return acc.plus(productPrice.mul(item.quantity));
        }, new Decimal(0));
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
        if (orderItemsList.value?.filter(item => item.orderId === orderId) !== undefined)
            return;
        const result = await api.GetOrderItems(orderId);
        if (orderItemsList.value === null) {
            orderItemsList.value = [];
        }
        if (result === null) {
            return;
        }

        orderItemsList.value.push(...result);
    };

    const UpdateOrderStatus = async (orderId: string, status: string): Promise<boolean> => {
        const result = await api.UpdateOrderStatus(orderId, status);
        if (result) {
            toastr.success('Status successfully changed');
            return true;
        }
        toastr.error('Something went wrong');
        return false;
    }

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

        await cartStore.loadCart();

        await loadUserOrders();

        toastr.success("Order sended");
    }
    return {
        orderConfirmed,
        loadUserOrders,
        loadFullOrderInfo,
        loadOrderItems,
        orderList,
        orderFullList,
        orderItemsList,
        calcTotal,
        loadAllOrders,
        UpdateOrderStatus,
        loadOrdersPart,
        allOrders

    };
});