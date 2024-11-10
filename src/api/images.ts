import { ProductPreviewCreateRequest, CategoryPreviewCreateRequest, ProductImage, CategoryImage } from "@models";
import apiInstance from "./apiInstance";

export const GetProductPreviewsById = async (id: string, count: number, offset: number): Promise<ProductImage[] | null> => {
    try {
        const { data, status } = await apiInstance.get(`/products/id=${id}/previews/count=${count}&offset=${offset}`);
        console.log('[api]', 'User valid status:', status);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export const GetCategoryPreviewsById = async (id: number): Promise<CategoryImage[] | null> => {
    try {
        const { data, status } = await apiInstance.get(`/category/id=${id}/preview`);
        console.log('[api]', 'User valid status:', status);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export const GetPreviewById = async (id: number): Promise<string | null> => {
    try {
        const { data, status } = await apiInstance.get(`/files/${id}`, { responseType: 'arraybuffer' });
        console.log('[api]', 'User valid status:', status);
        return URL.createObjectURL(new Blob([data]));
    }
    catch (e) {
        console.log(e);
        return null;
    }
}


export const AddNewPhoto = async (formFile: FormData): Promise<number | null> => {
    try {
        const { data, status } = await apiInstance.post(`/files`, formFile, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log('[api]', 'User valid status:', status);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export const AddNewProductPhoto = async (previewCreateRequest: ProductPreviewCreateRequest): Promise<boolean | null> => {

    try {
        const { status } = await apiInstance.post(`/products/add/preview`, previewCreateRequest);
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}


export const AddNewCategoryPhoto = async (categoryPreviewCreateRequest: CategoryPreviewCreateRequest): Promise<boolean | null> => {
    try {
        const { status } = await apiInstance.post(`/category/add/preview`, categoryPreviewCreateRequest);
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export const DeleteProductPhoto = async (id: number): Promise<boolean | null> => {
    try {
        const { status } = await apiInstance.delete(`/products/preview/id=${id}`);
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}