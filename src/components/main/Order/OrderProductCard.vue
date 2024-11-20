<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { usePreviewImagesStore, useProductStore, useSessionStore } from '@storage';
import { OrderItemDto, ProductDto } from '@models';
import Decimal from 'decimal.js';
const sessionStorage = useSessionStore();
const previewStore = usePreviewImagesStore();
const productStore = useProductStore();

const props = defineProps<{
    info: OrderItemDto;
}>();

const quantity = ref<number>(props.info.quantity);

const product = ref<ProductDto | null>(productStore.getProductById(props.info.productId));
const totalCost = computed<Decimal>(() => {
    if (product.value === null) {
        return new Decimal(1);
    }

    return new Decimal(product.value.price).times(new Decimal(quantity.value));
});
const file = ref<string | null>(null);

onMounted(async () => {
    if (previewStore.productsPreviews === null) {
        await previewStore.LoadProductsPreviews(props.info.productId);
    }
    if (previewStore.productsPreviews !== null && previewStore.productsPreviews.length < 1) {
        await previewStore.LoadProductsPreviews(props.info.productId);
    }
    if (previewStore.productsPreviews !== null) {
        const preview = previewStore.productsPreviews.filter(x => x.productId === props.info.productId)[0];
        if (preview === undefined)
            return;
        const previewUrl = await previewStore.loadPreview(preview.imageId);
        if (previewUrl !== null)
            file.value = previewUrl;
    }
})

</script>
<template>
    <div class="product-container">
        <div class="image-container">
            <img v-if="file !== null" :src="file" alt="product preview" class="image-preview" />
        </div>
        <div v-if="product !== null" class="info-container">
            <div @click="sessionStorage.pickItem(product.id)" class="name">
                <span class="text-large">{{ product.name }}</span>
            </div>
            <div class="quantity-container">
                <span class="text-large">{{ quantity }}</span>
            </div>
            <div class="cost">
                <span class="text-large">{{ totalCost }}$</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.product-container {
    display: flex;
    width: 100%;
    max-height: 200px;
    padding: 10px;
    padding-right: 30px;
    background-color: $linear-card-background-color;
    border-radius: 15px;
    position: relative;

    & .image-container {
        max-width: 400px;
        min-width: 200px;
        max-height: 150px;
        overflow: hidden;

        & .image-preview {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }

    & .info-container {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 15px;
        width: 100%;
        align-items: center;

        & .name {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }

        & .quantity-container {
            display: flex;
            justify-content: center;

            & .quantity {
                border-radius: 7px;
                border: 1px solid black;
                padding: 7px;
                text-align: center;
                width: 50%;
            }
        }
    }

    & .additional-buttons-container {
        & .delete-button {
            position: absolute;
            z-index: 5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30px;
            width: 30px;
            top: 10px;
            right: 10px;
            border-radius: 50%;
            padding: 5px;
            transition: all .5s ease;

            &:hover {
                background-color: rgb(247, 134, 134);
            }
        }
    }
}
</style>