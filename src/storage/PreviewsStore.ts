import { PreviewImage, ProductImage } from "@models";
import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import { imagesApi } from "@api/index";

export const usePreviewImagesStore = defineStore('previewStore', () => {
    const productsPreviews = ref<ProductImage[] | null>(null);
    /* const previews = useLocalStorage<PreviewImage[] | null>('previews', null, { serializer: StorageSerializers.object }); */
    const previews = ref<PreviewImage[] | null>(null);

    const LoadProductsPreviews = async (id: string) => {
        if (productsPreviews.value === null) {
            productsPreviews.value = [];
        }
        const previews = await imagesApi.GetProductPreviewsById(id, 20, productsPreviews.value.filter(x => x.productId === id).length);

        if (previews !== null) {
            previews.sort((a, b) => a.imageId - b.imageId);
            const map = new Map<number, ProductImage>();

            [...productsPreviews.value, ...previews].forEach(item => {
                map.set(item.imageId, item);
            });
            productsPreviews.value = Array.from(map.values());
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

    const getImageUrl = async (temp: ProductImage[]): Promise<string[]> => {
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
        return productsPreviews.value.filter(x => x.productId === id);
    }


    return {
        LoadProductsPreviews,
        productsPreviews,
        loadPreview,
        previews,
        getImageUrl,
        getProductImages
    };
})