import { CategoryCreateRequest, ProductCreateRequest } from "@models";
import { defineStore } from "pinia";
import { api } from "../api";
import { useDataStore } from "./DataStorage";
import toastr from 'toastr';

export const useCreatingStore = defineStore('creatingStore', () => {
    const dataStorage = useDataStore();
    const AddNewRootCategory = async (name: string, url: string) => {
        const result = await api.AddNewCategory({ name, imageUrl: url, parentCategoryId: 0 });
        if (result) {
            toastr.success("New root category added");
            await dataStorage.loadCategories(0);
            return;
        }
        toastr.error("Something went wrong");
    }
    const AddNewCategory = async (categoryCreateRequest: CategoryCreateRequest) => {
        const result = await api.AddNewCategory(categoryCreateRequest);
        if (result) {
            toastr.success("New category added");
            await dataStorage.loadCategories(categoryCreateRequest.parentCategoryId);
            return;
        }
        toastr.error("Something went wrong");
    }
    const AddNewProduct = async (productCreateRequest: ProductCreateRequest) => {
        const result = await api.AddNewProduct(productCreateRequest);
        if (result) {
            toastr.success("New product added");
            await dataStorage.loadProducts(productCreateRequest.categoryId);
            return;
        }
        toastr.error("Something went wrong");
    }
    return {
        AddNewCategory,
        AddNewProduct,
        AddNewRootCategory
    }
});