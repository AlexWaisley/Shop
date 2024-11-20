import { CategoryImage, PreviewImage, ProductImage } from "@models";
/* import { StorageSerializers, useLocalStorage } from "@vueuse/core"; */
import { defineStore } from "pinia";
import { ref } from "vue";
import { imagesApi } from "@api/index";

export const usePreviewImagesStore = defineStore('previewStore', () => {
    const productsPreviews = ref<ProductImage[] | null>(null);
    const categoriesPreviews = ref<CategoryImage[] | null>(null);
    /* const previews = useLocalStorage<PreviewImage[] | null>('previews', null, { serializer: StorageSerializers.object }); */
    const previews = ref<PreviewImage[] | null>(null);

    const LoadProductsPreviews = async (id: string) => {
        if (productsPreviews.value === null) {
            productsPreviews.value = [];
        }
        const loadedPreviews = await imagesApi.GetProductPreviewsById(id, 20, 0/* productsPreviews.value.filter(x => x.productId === id).length - 1 */);

        if (loadedPreviews !== null) {
            loadedPreviews.sort((a, b) => a.imageId - b.imageId);
            const map = new Map<number, ProductImage>();

            [...productsPreviews.value, ...loadedPreviews].forEach(item => {
                map.set(item.imageId, item);
            });
            productsPreviews.value = Array.from(map.values());
        }
    }

    const LoadCategoriesPreviews = async (id: number) => {
        if (categoriesPreviews.value === null) {
            categoriesPreviews.value = [];
        }

        const loadedPreview = categoriesPreviews.value.find(x => x.categoryId === id);

        if (loadedPreview !== undefined)
            return loadedPreview;

        const previews = await imagesApi.GetCategoryPreviewsById(id);

        if (previews !== null) {
            previews.sort((a, b) => a.imageId - b.imageId);
            const map = new Map<number, CategoryImage>();

            [...categoriesPreviews.value, ...previews].forEach(item => {
                map.set(item.imageId, item);
            });
            categoriesPreviews.value = Array.from(map.values());
        }
    }

    const loadCategoryPreviewByCategoryId = async (id: number) => {
        if (categoriesPreviews.value === null) {
            categoriesPreviews.value = [];
        }

        const previews = await imagesApi.GetCategoryPreviewsById(id);

        if (previews !== null) {
            previews.sort((a, b) => a.imageId - b.imageId);
            const map = new Map<number, CategoryImage>();

            [...categoriesPreviews.value, ...previews].forEach(item => {
                map.set(item.imageId, item);
            });
            categoriesPreviews.value = Array.from(map.values());
        }
    }

    const loadPreview = async (id: number): Promise<string | null> => {
        if (previews.value !== null && previews.value.length > 0) {
            const preview = previews.value.find(x => x.id === id);
            if (preview !== undefined)
                return preview.url;
        }
        if (previews.value === null) {
            previews.value = [];
        }
        const result = await imagesApi.GetPreviewById(id);
        if (result === null)
            return null;
        previews.value.push({ id, url: result });
        return result;
    }

    const getImageUrl = async (temp: (ProductImage | CategoryImage)[]): Promise<string[]> => {
        const files = ref<string[]>([]);

        for (const x of temp) {
            const res = await loadPreview(x.imageId)
            if (res === null)
                return [];
            if (files.value === null)
                files.value = [];
            files.value.push(res);
        }

        return files.value;
    }

    const getProductImages = async (id: string): Promise<ProductImage[]> => {
        if (productsPreviews.value === null) {
            await LoadProductsPreviews(id);
        }
        if (productsPreviews.value !== null && productsPreviews.value.length < 1) {
            await LoadProductsPreviews(id);
        }
        if (productsPreviews.value === null || productsPreviews.value.length === 0) {
            return [];
        }

        await LoadProductsPreviews(id);

        return productsPreviews.value.filter(x => x.productId === id);
    }

    const deleteProductImage = async (id: number) => {
        if (productsPreviews.value === null)
            return

        await imagesApi.DeleteProductPhoto(id);

        const index = productsPreviews.value.findIndex(x => x.imageId === id);
        if (index !== undefined) {
            productsPreviews.value.splice(index, 1);
            if (index === 0 && productsPreviews.value.length === 1)
                productsPreviews.value = [];
        }
    }

    const getCategoryImages = async (id: number): Promise<CategoryImage[]> => {
        if (categoriesPreviews.value === null) {
            await LoadCategoriesPreviews(id);
        }
        if (categoriesPreviews.value !== null && categoriesPreviews.value.length < 1) {
            await LoadCategoriesPreviews(id);
        }
        if (categoriesPreviews.value === null || categoriesPreviews.value.length === 0) {
            return [];
        }
        return categoriesPreviews.value.filter(x => x.categoryId === id);
    }


    return {
        LoadProductsPreviews,
        productsPreviews,
        loadPreview,
        previews,
        categoriesPreviews,
        getImageUrl,
        getProductImages,
        LoadCategoriesPreviews,
        getCategoryImages,
        loadCategoryPreviewByCategoryId,
        deleteProductImage
    };
})