import { Product, ProductCreateRequest, ProductDto, ProductUpdateRequest } from "@models";
import apiInstance from "./apiInstance";

export const GetProductsByCategoryId = async (categoryId: number, count: number, offset: number): Promise<ProductDto[] | null> => {
    try {
        const { data, status } = await apiInstance.get(`/products/category/id=${categoryId}/count=${count}&offset=${offset}`);
        console.log('[api]', 'User valid status:', status);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

export const GetProductInfoById = async (id: string): Promise<Product | null> => {
    try {
        const { data, status } = await apiInstance.get(`/products/id=${id}/full`);
        console.log('[api]', 'User valid status:', status);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

export const GetProductList = async (count: number, offset: number): Promise<Product[] | null> => {
    try {
        const { data, status } = await apiInstance.get(`/products/general/count=${count}&offset=${offset}`);
        console.log('[api]', 'User valid status:', status);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};


export const UpdateProductInfo = async (productUpdateRequest: ProductUpdateRequest): Promise<boolean | null> => {
    try {
        const { status } = await apiInstance.post(`/products/update`, productUpdateRequest);
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

export const AddNewProduct = async (productCreateRequest: ProductCreateRequest): Promise<boolean | null> => {
    try {
        const { status } = await apiInstance.post(`/products/add`, productCreateRequest);
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};