import { Category, Product, ProductDto, ShippingAddress } from "@models";
import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import Decimal from "decimal.js";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { api } from "../api";
import { useSessionStore } from "./SessionStore";
import { useDisplayInfoStore } from "./displayInfoStore";

export const useDataStore = defineStore('dataStore', () => {
    const displayedProducts = ref<ProductDto[] | null>(null);
    const products = useLocalStorage<ProductDto[] | null>('products', null, { serializer: StorageSerializers.object });
    const productsFullInfo = useLocalStorage<Product[] | null>('productsFullInfo', null, { serializer: StorageSerializers.object });
    const categories = useLocalStorage<Category[] | null>('categoryList', null, { serializer: StorageSerializers.object });
    const rootCategories = useLocalStorage<Category[] | null>('rootCategoryList', null, { serializer: StorageSerializers.object });
    const shippingAddresses = useLocalStorage<ShippingAddress[] | null>('shippingAddresses', null, { serializer: StorageSerializers.object });
    const sessionStore = useSessionStore();
    const displayStore = useDisplayInfoStore();

    const startSearch = async (name: string) => {
        if (products.value === null || products.value.length === 0) {
            products.value = await api.GetProductList(20, 0);
        }
        if (products.value === null || products.value.length === 0) {
            return;
        }
        displayedProducts.value = products.value.filter(x => x.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
        let page = 1;
        displayStore.productPageOpen = true;
        while (displayedProducts.value.length < 20) {
            const additionalProducts = await api.GetProductList(20, page * 20);
            if (additionalProducts === null || additionalProducts.length === 0) {
                break;
            }
            products.value.push(...additionalProducts);

            displayedProducts.value = products.value.filter(x => x.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));

            page++;
        }
    }

    const loadCategories = async (parentCategoryId: number) => {
        const result = await api.LoadCategories(parentCategoryId);

        if (result === null) {
            return;
        }

        if (parentCategoryId === 0) {
            if (rootCategories.value === null) {
                rootCategories.value = [];
            }

            rootCategories.value = result;
            return;
        }

        if (categories.value === null) {
            categories.value = [];
        }

        const map = new Map<number, Category>();

        [...categories.value, ...result].forEach(item => {
            map.set(item.id, item);
        });
        categories.value = Array.from(map.values());
    }

    watch(() => products.value?.length, () => {
        if (sessionStore.pickedCategories === null || sessionStore.pickedCategories.length === 0) {
            return 0;
        }
        const categoryId = sessionStore.pickedCategories[sessionStore.pickedCategories.length - 1].id;
        displayProductsByCategoryId(categoryId);
    })

    const loadProducts = async (categoryId: number) => {
        const offset = ref(0);
        if (products.value !== null) {
            offset.value = products.value.filter(x => x.categoryId === categoryId).length;
        }

        const result = await api.GetProductsByCategoryId(categoryId, 20, offset.value);
        if (result === null) {
            return;
        }
        if (products.value === null) {
            products.value = [];
        }

        products.value.push(...result);
    }

    const displayProductsByCategoryId = async (categoryId: number) => {
        let counter = 10;
        if (products.value === null || products.value.length === 0) {
            products.value = [];
            await loadProducts(categoryId);
        }

        const product = products.value.filter((p) => p.categoryId === categoryId);
        while (product.length < 20 && counter < 10) {
            await loadProducts(categoryId);
            counter++;
        }

        displayedProducts.value = product;

        return product;
    }

    const loadShippingAddresses = async () => {
        shippingAddresses.value = await api.GetAddresses();
    }

    const getProductPriceById = (id: string): Decimal => {
        if (products.value === null || products.value.length === 0) {
            return new Decimal(0);
        }
        const product = products.value.find((p) => p.id === id);
        return product ? product.price : new Decimal(0);
    }

    const getProductById = (id: string): ProductDto | null => {
        if (products.value === null || products.value.length === 0) {
            return null;
        }

        const product = products.value.find((p) => p.id === id);
        if (product === undefined)
            return null;

        return product;
    }
    const getFullProductById = async (id: string): Promise<Product | null> => {
        if (productsFullInfo.value === null || productsFullInfo.value.length === 0) {
            const result = await api.GetProductInfoById(id);
            if (result === null) {
                return null;
            }
            if (productsFullInfo.value === null)
                productsFullInfo.value = []
            productsFullInfo.value.push(result);
            return result
        }

        const product = productsFullInfo.value.find((p) => p.id === id);
        if (product === undefined) {
            const result = await api.GetProductInfoById(id);
            if (result === null) {
                return null;
            }
            if (productsFullInfo.value === null)
                productsFullInfo.value = []
            productsFullInfo.value.push(result);
            return result
        }

        return product;
    }


    return {
        products,
        getProductPriceById,
        startSearch,
        productsFullInfo,
        loadProducts,
        loadCategories,
        getFullProductById,
        getProductById,
        displayedProducts,
        rootCategories,
        categories,
        displayProductsByCategoryId,
        shippingAddresses,
        loadShippingAddresses
    };
})