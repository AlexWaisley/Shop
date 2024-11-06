import { defineStore } from "pinia"
import { useSessionStore } from "./SessionStore";
import { useDataStore } from "./DataStorage";
import { CartDto } from "@models";
import { api } from "../api";
import Decimal from "decimal.js";
import toastr from "toastr";
import { StorageSerializers, useLocalStorage } from "@vueuse/core";

export const useCartStore = defineStore('cartStore', () => {

    const sessionStore = useSessionStore();
    const dataStorage = useDataStore();

    const cart = useLocalStorage<CartDto | null>('cart', null, { serializer: StorageSerializers.object });

    const calcTotal = (): Decimal => {
        if (cart.value === null || cart.value.items.length === 0) {
            return new Decimal(-1);
        }

        return cart.value.items.reduce((acc, item) => {
            const productPrice = new Decimal(dataStorage.getProductPriceById(item.productId));
            return acc.plus(productPrice.times(new Decimal(item.quantity)));
        }, new Decimal(0));
    }

    const calcTotalQuantity = (): number => {
        if (cart.value === null || cart.value.items.length === 0)
            return -1;
        return cart.value.items.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0);

    }

    const loadCart = async () => {
        const result = await api.GetCart();
        if (dataStorage.shippingAddresses === null) {
            await dataStorage.loadShippingAddresses();
        }
        if (result === null || cart.value === null) {
            cart.value = { id: "0", items: [] };
            return;
        }
        cart.value = result;
    }

    const isItemInCart = (productId: string) => {
        if (cart.value === null) {
            return false;
        }
        const cartItem = cart.value.items.find(x => x.productId === productId);
        if (cartItem === undefined || cartItem.id === "0") {
            return false;
        }
        return true;
    }

    const addToCart = async (productId: string, quantity: number) => {
        if (cart.value === null) {
            cart.value = { id: "0", items: [] };
        }

        sessionStore.addToHistory(productId);
        const cartItem = cart.value.items.find(x => x.productId === productId);
        if (cartItem === undefined || cartItem.id === "0") {
            if (sessionStore.currUser === null) {
                cart.value.items.push({ id: "0", cartId: "0", productId, quantity });
                toastr.warning('You must register or login to commit order.');
                return;
            }
            const result = await api.AddToCart({
                productId, quantity
            });
            if (result)
                await loadCart();
        }
    }

    const removeFromCart = async (cartItemId: string) => {
        if (cart.value === null) {
            cart.value = { id: "0", items: [] };
        }

        const result = await api.RemoveFromCart(cartItemId);
        if (result)
            await loadCart();
    }


    const changeProductQuantity = async (itemId: string, quantity: number, productId: string) => {
        if (cart.value === null) {
            cart.value = { id: "0", items: [] };
        }
        const index = cart.value.items.find(x => x.id === itemId);
        if (index === undefined)
            return;
        const result = await api.UpdateCartItemQuantity({ id: itemId, quantity, productId, cartId: "0" })
        if (!result)
            return;
        loadCart();
        calcTotal();
        calcTotalQuantity();
    }

    return {
        addToCart,
        removeFromCart,
        cart,
        calcTotal,
        loadCart,
        calcTotalQuantity,
        isItemInCart,
        changeProductQuantity
    };
});