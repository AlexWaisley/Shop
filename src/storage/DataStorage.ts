import { Category, ShippingAddress } from "@models";
import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { categoriesApi, api } from "@api/index";
import { ref } from "vue";
import toastr from "toastr";
import { useProductStore } from "./ProductStore";

export const useDataStore = defineStore('dataStore', () => {
    const categories = useLocalStorage<Category[] | null>('categoryList', null, { serializer: StorageSerializers.object });
    const rootCategories = useLocalStorage<Category[] | null>('rootCategoryList', null, { serializer: StorageSerializers.object });

    const pickedCategory = ref<Category | null>(null);
    const shippingAddresses = useLocalStorage<ShippingAddress[] | null>('shippingAddresses', null, { serializer: StorageSerializers.object });
    const productStore = useProductStore();

    const categoryPath = ref<Category[]>([]);

    const findCategoryByName = (name: string): Category | null => {
        if (rootCategories.value === null)
            return null;
        let category = rootCategories.value?.find(x => x.name === name);
        if (category === undefined && categories.value !== null)
            category = categories.value.find(x => x.name === name);

        if (category === undefined)
            return null;
        return category;
    }

    const findCategoryById = (id: number): Category | null => {
        if (rootCategories.value === null)
            return null;
        let category = rootCategories.value.find(x => x.id === id);
        if (category === undefined && categories.value !== null)
            category = categories.value.find(x => x.id === id);

        if (category === undefined)
            return null;
        return category;
    }

    const findSubCategoriesByName = (parentCategoryName: string): Category[] => {
        if (categories.value === null)
            return [];
        let parentCategory = categories.value.find(x => x.name === parentCategoryName);
        if (parentCategory !== undefined) {
            const res = categories.value.filter(x => x.parentCategory === parentCategory!.id);
            if (res) {
                return res;
            }
        }
        if (rootCategories.value === null)
            return [];
        parentCategory = rootCategories.value.find(x => x.name === parentCategoryName);
        if (parentCategory !== undefined) {
            const res = categories.value.filter(x => x.parentCategory === parentCategory!.id);
            if (res) {
                return res;
            }
        }
        return [];
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

    const deleteCategory = async () => {
        console.log(pickedCategory.value);
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

    const getFullCategoryPath = (categoryName: string = "", productId: string = "") => {
        if (!categories.value)
            return;
        let categoryId = -1;

        if (categoryPath.value.length > 0) {
            const existingId = categoryPath.value.findIndex(x => x.name === categoryName);
            if (!existingId) {
                categoryPath.value = [];
            }
            else {
                categoryPath.value = [];
                categoryPath.value = categoryPath.value.slice(0, existingId);
            }
        }

        if (productId !== "") {
            let temp = productStore.findProductById(productId);
            if (temp === null)
                return;
            categoryId = temp.categoryId;
            const category = findCategoryById(categoryId);
            if (category !== null) {
                categoryId = category.parentCategory;
                categoryPath.value.unshift(category);
            }
        }
        if (categoryName !== "") {
            let temp = findCategoryByName(categoryName);
            if (temp === null)
                return;
            categoryId = temp.parentCategory;
            categoryPath.value.unshift(temp);
        }
        if (categoryId === -1)
            return;

        let temp = findCategoryById(categoryId);
        if (temp === null)
            return;


        while (categoryId !== 0) {
            let temp = findCategoryById(categoryId);
            if (temp === null)
                return;
            categoryId = temp.parentCategory;
            categoryPath.value.unshift(temp);
        }
    }

    const cleanPath = () => {
        categoryPath.value = [];
    }

    const isChildExists = (categoryId: number): boolean => {
        if (categories.value === null)
            return false;
        categories.value.forEach(x => () => {
            if (x.parentCategory === categoryId)
                return true;
        })
        if (rootCategories.value === null)
            return false;
        rootCategories.value.forEach(x => () => {
            if (x.parentCategory === categoryId)
                return true;
        })
        return true;
    }

    return {
        loadCategories,
        rootCategories,
        categories,
        shippingAddresses,
        loadShippingAddresses,
        findCategoryByName,
        findCategoryById,
        categoryUpdate,
        deleteCategory,
        pickedCategory,
        getFullCategoryPath,
        categoryPath,
        cleanPath,
        isChildExists,
        findSubCategoriesByName
    };
})