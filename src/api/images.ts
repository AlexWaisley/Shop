import { PreviewCreateRequest, ProductImage } from "@models";
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

export const AddNewProductPhoto = async (previewCreateRequest: PreviewCreateRequest): Promise<boolean | null> => {

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