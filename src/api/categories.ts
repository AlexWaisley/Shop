import { Category, CategoryCreateRequest, CategoryPreviewUpdateRequest, CategoryUpdateRequest } from "@models";
import apiInstance from "./apiInstance";

export const LoadCategories = async (parentCategoryId: number): Promise<Category[] | null> => {
    try {
        const { data, status } = await apiInstance.get(`/categories/id=${parentCategoryId}`);
        console.log('[api]', 'User valid status:', status);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

export const AddNewCategory = async (categoryCreateRequest: CategoryCreateRequest): Promise<boolean | null> => {
    try {
        const { status } = await apiInstance.post(`/categories`, categoryCreateRequest);
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

export const UpdateCategory = async (categoryUpdateRequest: CategoryUpdateRequest): Promise<boolean | null> => {
    try {
        const { status } = await apiInstance.post(`/category/update`, categoryUpdateRequest);
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

export const UpdateCategoryPreview = async (categoryPreviewUpdateRequest: CategoryPreviewUpdateRequest): Promise<boolean | null> => {
    try {
        const { status } = await apiInstance.post(`/category/preview/update`, categoryPreviewUpdateRequest);
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};

export const DeleteCategory = async (id: number): Promise<boolean | null> => {
    try {
        const { status } = await apiInstance.delete(`/category/id=${id}`);
        console.log('[api]', 'User valid status:', status);
        return status === 200;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};


