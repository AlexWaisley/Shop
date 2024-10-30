import { defineStore } from "pinia"
import { useSessionStore } from "./SessionStore";
import { useDataStore } from "./DataStorage";
import { ref } from "vue";
import { CartDto } from "@models";
import { api } from "../api";
import Decimal from "decimal.js";

export const useCartStore = defineStore('cartStore', () => {

    const sessionStore = useSessionStore();
    const dataStorage = useDataStore();

    const cart = ref<CartDto | null>(null);

    const calcTotal = (): Decimal => {
        if (cart.value === null || cart.value.items.length === 0)
            return new Decimal(-1);
        return cart.value.items.reduce((acc, item) => {
            const productPrice = dataStorage.getProductPriceById(item.productId);
            return acc.plus(productPrice.mul(item.quantity));
        }, new Decimal(0));
    }

    const loadCart = async () => {
        const result = await api.GetCart();
        if (result === null || cart.value === null) {
            cart.value = { id: "0", items: [] };
            return;
        }
        cart.value = result;
    }

    const addToCart = async (productId: string, quantity: number) => {
        if (cart.value === null) {
            cart.value = { id: "0", items: [] };
        }

        sessionStore.addToHistory(productId);

        if (cart.value.items.find(x => x.productId === productId) === undefined) {
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


    /* const changeQuantityOfProductInBucket = (bucketProduct: BucketProduct, newQuantity: number) => {
        if (cart.value === null) {
            cart.value = { products: [], totalCost: 0 };
        }
        const index = cart.value.products.indexOf(bucketProduct);
        cart.value.products[index].quantity = newQuantity;
        cart.value.products[index].totalCost = cart.value.products[index].product.cost * cart.value.products[index].quantity;
        calcTotal();
    } */

    return {
        addToCart,
        removeFromCart,
        cart,
        calcTotal,
        loadCart,


    };
});