import { Category, CategoryCreateRequest } from "@models";
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
