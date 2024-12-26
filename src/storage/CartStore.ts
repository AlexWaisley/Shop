import { defineStore } from "pinia"
import { useSessionStore } from "./SessionStore";
import { useDataStore } from "./DataStorage";
import { useProductStore } from "./ProductStore";
import { CartDto } from "@models";
import { cartApi } from "@api/index";
import Decimal from "decimal.js";
import toastr from "toastr";
import { StorageSerializers, useLocalStorage } from "@vueuse/core";

export const useCartStore = defineStore('cartStore', () => {

    const sessionStore = useSessionStore();
    const dataStorage = useDataStore();
    const productStore = useProductStore();

    const cart = useLocalStorage<CartDto | null>('cart', null, { serializer: StorageSerializers.object });

    const calcTotal = async (): Promise<Decimal> => {
        if (cart.value === null || cart.value.items.length === 0) {
            return new Decimal(-1);
        }

        let total = new Decimal(0);

        for (const item of cart.value.items) {
            const productPrice = new Decimal(await productStore.getProductPriceById(item.productId));
            total = total.plus(productPrice.times(new Decimal(item.quantity)));
        }
        return total;
    };

    const calcTotalQuantity = (): number => {
        if (cart.value === null || cart.value.items.length === 0)
            return -1;
        return cart.value.items.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0);

    }

    const loadCart = async () => {
        const result = await cartApi.GetCart();
        if (dataStorage.shippingAddresses === null) {
            await dataStorage.loadShippingAddresses();
        }
        if (result === null) {
            return;
        }
        if (cart.value === null)
            return;

        for (const item of cart.value.items) {
            const temp = await productStore.getProductById(item.productId);
            if (temp) {
                continue;
            }
        }

        const itemsToAdd = cart.value.items.filter(cartItem => cartItem.id === "0");
        cart.value = result;
        itemsToAdd.forEach(cartItem => {
            addToCart(cartItem.productId, cartItem.quantity);
        });
        cart.value.items = cart.value.items.filter(cartItem => cartItem.id !== "0");
    }

    const isItemInCart = (productId: string) => {
        if (cart.value === null) {
            return false;
        }
        const cartItem = cart.value.items.find(x => x.productId === productId);
        if (cartItem === undefined) {
            return false;
        }
        return true;
    }

    const addToCart = async (productId: string, quantity: number = 1) => {
        if (sessionStore.currUser !== null) {
            await loadCart();
        }

        if (cart.value === null) {
            cart.value = { id: "0", items: [] };
        }

        const cartItem = cart.value.items.find(x => x.productId === productId);
        if (cartItem === undefined || cartItem.id === "0") {
            if (sessionStore.currUser === null && cartItem === undefined) {
                cart.value.items.push({ id: "0", cartId: "0", productId, quantity });
                toastr.warning('You must register or login to commit order.');
                return;
            }
            const result = await cartApi.AddToCart({
                productId, quantity
            });
            if (result)
                await loadCart();
        }
    }

    const removeFromCart = async (productId: string) => {
        if (cart.value === null) {
            cart.value = { id: "0", items: [] };
        }

        const temp = cart.value.items.find(x => x.productId === productId);

        if (temp === undefined) {
            return;
        }
        if (cart.value.items.length > 0) {
            const index = cart.value.items.findIndex(x => x.productId === productId);
            if (index !== undefined) {
                cart.value.items.splice(index, 1);
            }
        }

        if (sessionStore.currUser === null) {
            return;
        }

        const cartItemId = temp.id;

        const result = await cartApi.RemoveFromCart(cartItemId);
        if (result)
            await loadCart();
    }


    const changeProductQuantity = async (itemId: string, quantity: number, productId: string) => {
        if (cart.value === null) {
            cart.value = { id: "0", items: [] };
        }
        const cartItem = cart.value.items.find(x => x.id === itemId);
        if (itemId === '0' || cartItem === undefined) {
            const altCartItem = cart.value.items.find(x => x.productId === productId);
            if (altCartItem !== undefined) {
                const index = cart.value.items.indexOf(altCartItem);
                cart.value.items[index].quantity = quantity;
                calcTotal();
                calcTotalQuantity();
            }
            return;
        }
        const result = await cartApi.UpdateCartItemQuantity({ id: itemId, quantity, productId, cartId: "0" })
        if (!result)
            return;
        loadCart();
        calcTotal();
        calcTotalQuantity();
    }

    const cleanCart = () => {
        if (cart.value !== null)
            cart.value.items = [];
    }

    return {
        addToCart,
        removeFromCart,
        cart,
        calcTotal,
        loadCart,
        calcTotalQuantity,
        isItemInCart,
        changeProductQuantity,
        cleanCart
    };
});