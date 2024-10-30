import { Category, Product, ProductDto } from "@models";
import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import Decimal from "decimal.js";
import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../api";

export const useDataStore = defineStore('dataStore', () => {
    const displayedProducts = ref<ProductDto[] | null>(null);
    const products = useLocalStorage<ProductDto[] | null>('products', null, { serializer: StorageSerializers.object });
    const productsFullInfo = useLocalStorage<Product[] | null>('productsFullInfo', null, { serializer: StorageSerializers.object });
    const categories = useLocalStorage<Category[] | null>('categoryList', null, { serializer: StorageSerializers.object });

    const startSearch = async (name: string) => {
        if (products.value === null || products.value.length === 0) {
            products.value = await api.GetProductList(20, 0);
        }
        if (products.value === null || products.value.length === 0) {
            return;
        }
        displayedProducts.value = products.value.filter(x => x.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
        let page = 1;

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
        if (categories.value === null) {
            categories.value = [];
        }

        categories.value.push(...result);
    }

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
    const getFullProductById = (id: string): Product | null => {
        if (productsFullInfo.value === null || productsFullInfo.value.length === 0) {
            return null;
        }

        const product = productsFullInfo.value.find((p) => p.id === id);
        if (product === undefined)
            return null;

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
        displayedProducts
    };
})