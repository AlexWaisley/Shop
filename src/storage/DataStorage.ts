import { Category, ShippingAddress } from "@models";
import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { categoriesApi, api } from "@api/index";

export const useDataStore = defineStore('dataStore', () => {
    const categories = useLocalStorage<Category[] | null>('categoryList', null, { serializer: StorageSerializers.object });
    const rootCategories = useLocalStorage<Category[] | null>('rootCategoryList', null, { serializer: StorageSerializers.object });
    const shippingAddresses = useLocalStorage<ShippingAddress[] | null>('shippingAddresses', null, { serializer: StorageSerializers.object });

    const loadCategories = async (parentCategoryId: number) => {
        const result = await categoriesApi.LoadCategories(parentCategoryId);

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

    const loadShippingAddresses = async () => {
        shippingAddresses.value = await api.GetAddresses();
    }

    return {
        loadCategories,
        rootCategories,
        categories,
        shippingAddresses,
        loadShippingAddresses,
    };
})