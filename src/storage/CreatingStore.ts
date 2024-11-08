import { CategoryCreateRequest, ProductCreateRequest } from "@models";
import { defineStore } from "pinia";
import { api } from "../api";
import { useDataStore } from "./DataStorage";
import toastr from 'toastr';
import { ProductUpdateRequest } from "../models/requests/ProductUpdateRequest";

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
    const AddNewProductPhoto = async (productId: string, file: FormData) => {
        const result = await api.AddNewPhoto(file);
        if (result !== null && result > 0) {
            toastr.success("New photo successfully added");
            const result1 = await api.AddNewProductPhoto({ productId, fileId: result });
            if (result1) {
                toastr.success("New product photo successfully added");
                return;
            }
            toastr.error("Something went wrong");
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
    const UpdateProduct = async (productUpdateRequest: ProductUpdateRequest) => {
        var result = await api.UpdateProductInfo(productUpdateRequest);
        if (result) {
            toastr.success("Product updated");
            return;
        }
        toastr.error("Something went wrong");

    }
    return {
        AddNewCategory,
        AddNewProduct,
        AddNewRootCategory,
        AddNewProductPhoto,
        UpdateProduct
    }
});