import { defineStore } from "pinia"
import { useSessionStore } from "./SessionStore";
import { OrderDto, OrderFull, OrderItemDto } from "@models";
import toastr from 'toastr';
import { ref } from "vue";
import { ordersApi } from "@api/index";
import { useCartStore } from "./CartStore";
import { useProductStore } from "./ProductStore";
import Decimal from "decimal.js";


export const useOrderRecordStore = defineStore('orderRecordStore', () => {

    const cartStore = useCartStore();
    const sessionStore = useSessionStore();
    const productStore = useProductStore();

    const orderList = ref<OrderDto[] | null>(null);
    const orderFullList = ref<OrderFull[] | null>(null);
    const orderItemsList = ref<OrderItemDto[] | null>(null);
    const allOrders = ref<OrderDto[] | null>(null);
    const pickedOrder = ref<OrderDto | null>(null);

    const loadUserOrders = async () => {
        const result = await ordersApi.GetUserOrders();
        if (result === null) {
            orderList.value = []
            return;
        }
        orderList.value = result;
        orderList.value.forEach(async (x) => {
            await loadOrderItems(x.id);
        })
    }

    const changePickedOrder = (order: OrderDto) => {
        pickedOrder.value = order;
    }

    const loadAllOrders = async () => {
        if (allOrders.value === null) {
            allOrders.value = [];
        }
        const result = await ordersApi.GetAllOrders();
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
        const result = await ordersApi.GetOrdersPart(allOrders.value.length, 20);

        if (result === null) {
            return;
        }
        allOrders.value = result;
        allOrders.value.forEach(async (x) => {
            await loadOrderItems(x.id);
        })
    }

    const calcTotal = async (reqOrderId: string): Promise<Decimal> => {
        if (orderItemsList.value === null) {
            return new Decimal(-1);
        }
        const orderItems = orderItemsList.value.filter(x => x.orderId === reqOrderId);
        if (orderItems === undefined || orderItems.length === 0)
            return new Decimal(-1);

        const res = async () => {
            let total = new Decimal(0);

            for (const item of orderItems) {
                const productPrice = new Decimal(await productStore.getProductPriceById(item.productId));
                total = total.plus(productPrice.mul(item.quantity));
            }

            return total;
        };

        const total = await res();

        return total;
    }

    const loadFullOrderInfo = async (orderId: string) => {
        const result = await ordersApi.GetOrder(orderId);
        if (orderFullList.value === null) {
            orderFullList.value = [];
        }
        if (result === null) {
            return;
        }
        orderFullList.value.push(result);
    }

    const loadOrderItems = async (orderId: string) => {
        if (orderItemsList.value === null) {
            orderItemsList.value = [];
            return;
        }
        const orderItems = orderItemsList.value.filter(item => item.orderId === orderId);
        if (orderItems !== undefined && orderItems.length > 0)
            return;
        const result = await ordersApi.GetOrderItems(orderId);
        if (orderItemsList.value === null) {
            orderItemsList.value = [];
        }
        if (result === null) {
            return;
        }

        orderItemsList.value.push(...result);
    };

    const UpdateOrderStatus = async (orderId: string, status: string): Promise<boolean> => {
        const result = await ordersApi.UpdateOrderStatus(orderId, status);
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

        const result = await ordersApi.CreateOrderRecord(shippingAddressId);

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
        allOrders,
        pickedOrder,
        changePickedOrder

    };
});