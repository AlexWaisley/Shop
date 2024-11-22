import {
    Product,
    ProductDto,
    ProductUpdateRequest
} from "@models";
import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import Decimal from "decimal.js";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { productsApi } from "@api/index";
import { useSessionStore } from "./SessionStore";
import { useDisplayInfoStore } from "./DisplayInfoStore";

export const useProductStore = defineStore('productStore', () => {
    const displayedProducts = ref<ProductDto[] | null>(null);
    const products = useLocalStorage<ProductDto[] | null>('products', null, { serializer: StorageSerializers.object });
    const productsFullInfo = useLocalStorage<Product[] | null>('productsFullInfo', null, { serializer: StorageSerializers.object });
    const sessionStore = useSessionStore();
    const displayStore = useDisplayInfoStore();

    const startSearch = async (name: string) => {
        if (products.value === null || products.value.length === 0) {
            products.value = await productsApi.GetProductList(20, 0);
        }
        if (products.value === null || products.value.length === 0) {
            return;
        }
        displayedProducts.value = products.value.filter(x => x.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
        let page = 1;
        displayStore.productPageOpen = true;
        while (displayedProducts.value.length < 20) {
            const additionalProducts = await productsApi.GetProductList(20, page * 20);
            if (additionalProducts === null || additionalProducts.length === 0) {
                break;
            }
            products.value.push(...additionalProducts);

            displayedProducts.value = products.value.filter(x => x.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));

            page++;
        }
    }

    const displayProductsByCategoryId = async (categoryId: number) => {
        let counter = 0;
        if (products.value === null || products.value.length === 0) {
            products.value = [];
            await loadProducts(categoryId);
        }

        let product = products.value.filter((p) => p.categoryId === categoryId);
        while (product.length < 20 && counter < 10) {
            await loadProducts(categoryId);
            counter++;
        }
        product = products.value.filter((p) => p.categoryId === categoryId);
        displayedProducts.value = product;
        displayStore.resetAll();
        displayStore.changeProductPageOpenStatus(true);

        return product;
    }

    const updateProduct = async (productInfo: ProductUpdateRequest) => {
        if (products.value === null || productsFullInfo.value === null) return;

        const index = products.value.findIndex(x => x.id === productInfo.id);
        if (index >= 0) {
            products.value.splice(index, 1);
        }

        const fullInfoIndex = productsFullInfo.value.findIndex(x => x.id === productInfo.id);
        if (fullInfoIndex >= 0) {
            productsFullInfo.value.splice(fullInfoIndex, 1);
            if (fullInfoIndex === 0 && productsFullInfo.value.length === 1) {
                productsFullInfo.value = [];
            }
        }

        await loadProducts(productInfo.categoryId);
        await getFullProductById(productInfo.id);
    };


    const getProductPriceById = async (id: string): Promise<Decimal> => {
        let product: ProductDto | undefined;
        if (products.value !== null) {
            product = products.value.find((p) => p.id === id);
            if (product === undefined) {
                const temp = await productsApi.GetProductById(id);
                if (temp !== null) {
                    product = temp;
                    products.value.push(product);
                }
            }
        }
        else {
            const temp = await productsApi.GetProductById(id);
            if (temp !== null)
                product = temp;
        }
        return product ? product.price : new Decimal(0);
    }

    const getProductById = async (id: string): Promise<ProductDto | null> => {
        if (products.value === null || products.value.length === 0) {
            return null;
        }

        const product = products.value.find((p) => p.id === id);
        if (product === undefined) {
            const temp = await productsApi.GetProductById(id);
            if (temp !== null) {
                products.value.push(temp);
                return temp;
            }
            return null;
        }

        return product;
    }

    const getFullProductById = async (id: string): Promise<Product | null> => {
        if (productsFullInfo.value === null || productsFullInfo.value.length === 0) {
            const result = await productsApi.GetProductInfoById(id);
            if (result === null) {
                return null;
            }
            if (productsFullInfo.value === null)
                productsFullInfo.value = []
            productsFullInfo.value.push(result);
            return { ...result }
        }

        const product = productsFullInfo.value.find((p) => p.id === id);

        if (product === undefined) {
            const result = await productsApi.GetProductInfoById(id);
            if (result === null) {
                return null;
            }
            if (productsFullInfo.value === null)
                productsFullInfo.value = []
            productsFullInfo.value.push(result);
            return { ...result }
        }

        return { ...product };
    }

    const loadProducts = async (categoryId: number) => {
        const offset = ref(0);
        if (products.value !== null) {
            offset.value = products.value.filter(x => x.categoryId === categoryId).length;
        }

        const result = await productsApi.GetProductsByCategoryId(categoryId, 20, 0);
        if (result === null) {
            return;
        }
        if (products.value === null) {
            products.value = [];
        }

        const map = new Map<string, ProductDto>();

        [...products.value, ...result].forEach(item => {
            map.set(item.id, item);
        });
        products.value = Array.from(map.values());
    }

    watch(() => products.value?.length, () => {
        if (sessionStore.pickedCategories === null || sessionStore.pickedCategories.length === 0) {
            return 0;
        }
        const categoryId = sessionStore.pickedCategories[sessionStore.pickedCategories.length - 1].id;
        if (displayStore.productPageOpen)
            displayProductsByCategoryId(categoryId);
    })

    return {
        products,
        getProductPriceById,
        startSearch,
        productsFullInfo,
        loadProducts,
        getFullProductById,
        getProductById,
        displayedProducts,
        displayProductsByCategoryId,
        updateProduct
    };
})