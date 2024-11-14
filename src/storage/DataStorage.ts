import { Category, ShippingAddress } from "@models";
import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { categoriesApi, api } from "@api/index";
import { ref, watch } from "vue";
import { useSessionStore } from "./SessionStore";
import toastr from "toastr";

export const useDataStore = defineStore('dataStore', () => {
    const categories = useLocalStorage<Category[] | null>('categoryList', null, { serializer: StorageSerializers.object });
    const rootCategories = useLocalStorage<Category[] | null>('rootCategoryList', null, { serializer: StorageSerializers.object });
    const lastCategory = ref<Category | null>(null);
    const pickedCategory = ref<Category | null>(null);
    const shippingAddresses = useLocalStorage<ShippingAddress[] | null>('shippingAddresses', null, { serializer: StorageSerializers.object });
    const displayedCategories = ref<Category[]>([]);
    const sessionStore = useSessionStore();


    const findCategoryByName = (name: string): Category | null => {
        if (rootCategories.value === null)
            return null;
        let category = rootCategories.value?.find(x => x.name === name);
        if (category === undefined && categories.value !== null)
            category = categories.value?.find(x => x.name === name);

        if (category === undefined)
            return null;
        return category;
    }

    const findCategoryById = (id: number): Category | null => {
        if (rootCategories.value === null)
            return null;
        let category = rootCategories.value?.find(x => x.id === id);
        if (category === undefined && categories.value !== null)
            category = categories.value?.find(x => x.id === id);

        if (category === undefined)
            return null;
        return category;
    }

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

    const categoryUpdate = async (parentCategoryId: number, name: string) => {
        if (pickedCategory.value === null)
            return;

        const id = pickedCategory.value.id;
        const result = await categoriesApi.UpdateCategory({ id, parentId: parentCategoryId, name });
        if (result) {
            if (categories.value === null)
                return;
            const index = categories.value.findIndex(x => x.id === id);
            if (index > 0) {
                categories.value[index].parentCategory = parentCategoryId;
                categories.value[index].name = name;
            }

            toastr.success("Successfully updated");
            return;
        }
        toastr.error("Something went wrong");
    }

    const changePickedCategory = (category: Category) => {
        pickedCategory.value = category;
        console.log(pickedCategory.value);
    }

    const deleteCategory = async () => {
        if (pickedCategory.value === null)
            return;

        const id = pickedCategory.value.id;
        const result = await categoriesApi.DeleteCategory(id);
        if (result) {
            if (categories.value === null)
                return;
            const temp = categories.value.findIndex(x => x.id === id);
            if (temp > 0)
                categories.value.splice(temp, 1);
            toastr.success("Successfully deleted");
            return;
        }
        toastr.error("Something went wrong");
    }

    const loadShippingAddresses = async () => {
        shippingAddresses.value = await api.GetAddresses();
    }

    watch(() => categories.value, () => {
        if (categories.value === null || categories.value.length < 1 || sessionStore.pickedCategories === null || sessionStore.pickedCategories === undefined || sessionStore.pickedCategories.length < 1) {
            return;
        }
        const parentCategoryId = sessionStore.pickedCategories[sessionStore.pickedCategories.length - 1].id
        displayedCategories.value = categories.value.filter(x => x.parentCategory === parentCategoryId);
    }, { immediate: true, deep: true });

    return {
        loadCategories,
        rootCategories,
        categories,
        shippingAddresses,
        loadShippingAddresses,
        displayedCategories,
        findCategoryByName,
        findCategoryById,
        categoryUpdate,
        deleteCategory,
        lastCategory,
        pickedCategory,
        changePickedCategory
    };
})