import { CategoryCreateRequest, ProductCreateRequest, ProductUpdateRequest } from "@models";
import { defineStore } from "pinia";
import { categoriesApi, imagesApi, productsApi } from "@api/index";
import { useDataStore } from "./DataStorage";
import { useProductStore } from "./ProductStore";
import toastr from 'toastr';
import { usePreviewImagesStore } from "./PreviewsStore";

export const useCreatingStore = defineStore('creatingStore', () => {
    const dataStorage = useDataStore();
    const productStore = useProductStore();
    const imageStore = usePreviewImagesStore();
    const AddNewRootCategory = async (name: string) => {
        const result = await categoriesApi.AddNewCategory({ name, parentCategoryId: 0 });
        if (result) {
            toastr.success("New root category added");
            await dataStorage.loadCategories(0);
            return;
        }
        toastr.error("Something went wrong");
    }
    const AddNewCategoryPhoto = async (categoryId: number, file: FormData) => {
        const result = await imagesApi.AddNewPhoto(file);
        if (result !== null && result > 0) {
            toastr.success("New photo successfully added");
            const result1 = await imagesApi.AddNewCategoryPhoto({ categoryId, fileId: result });
            if (result1) {
                toastr.success("New product photo successfully added");
                return;
            }
            toastr.error("Something went wrong");
            return;
        }
        toastr.error("Something went wrong");
    }
    const AddNewProductPhoto = async (productId: string, file: FormData) => {
        const result = await imagesApi.AddNewPhoto(file);
        if (result !== null && result > 0) {
            toastr.success("New photo successfully added");
            const result1 = await imagesApi.AddNewProductPhoto({ productId, fileId: result });
            if (result1) {
                toastr.success("New product photo successfully added");
                await imageStore.LoadProductsPreviews(productId);
                return;
            }
            toastr.error("Something went wrong");
            return;
        }
        toastr.error("Something went wrong");
    }
    const AddNewCategory = async (categoryCreateRequest: CategoryCreateRequest) => {
        const result = await categoriesApi.AddNewCategory(categoryCreateRequest);
        if (result) {
            toastr.success("New category added");
            await dataStorage.loadCategories(categoryCreateRequest.parentCategoryId);
            return;
        }
        toastr.error("Something went wrong");
    }

    const AddNewProduct = async (productCreateRequest: ProductCreateRequest) => {
        const result = await productsApi.AddNewProduct(productCreateRequest);
        if (result) {
            toastr.success("New product added");
            await productStore.loadProducts(productCreateRequest.categoryId);
            return;
        }
        toastr.error("Something went wrong");
    }

    const UpdateProduct = async (productUpdateRequest: ProductUpdateRequest) => {
        var result = await productsApi.UpdateProductInfo(productUpdateRequest);
        productStore.updateProduct(productUpdateRequest);
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
        AddNewCategoryPhoto,
        UpdateProduct
    }
});