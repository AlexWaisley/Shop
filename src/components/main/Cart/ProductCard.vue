<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useCartStore, usePreviewImagesStore, useProductStore } from '@storage';
import { CartItemDto, ProductDto } from '@models';
import Decimal from 'decimal.js';
const cartStore = useCartStore();
const productStore = useProductStore();
const imageStore = usePreviewImagesStore();

const props = defineProps<{
    info: CartItemDto;
    isQuantityFixed: boolean,
}>();

const quantity = ref<number>(props.info.quantity);

const product = ref<ProductDto | null>(null);
const totalCost = computed<Decimal>(() => {
    if (product.value === null) {
        return new Decimal(1);
    }
    return new Decimal(product.value.price).times(new Decimal(quantity.value));
});

defineEmits<{
    (e: 'changeQuantity', cartItemId: string, quantity: number, productId: string): void
}>();

const file = ref<string | null>(null);

watch(() => props.info, async () => {
    product.value = await productStore.getProductById(props.info.productId);
    if (product.value !== null)
        file.value = await imageStore.getProductPreview(product.value.id);
}, { immediate: true });
</script>

<template>
    <div class="product-container">
        <div class="image-container">
            <img v-if="file !== null" :src="file" alt="product preview" class="image-preview" />
            <img v-else src="/logo.jpg" alt="product preview" class="image-preview" />
        </div>
        <div v-if="product !== null" class="info-container">
            <RouterLink :to="'/item/' + product.id">
                <div class="name">
                    <span class="text-large">{{ product.name }}</span>
                </div>
            </RouterLink>
            <div class="quantity-container">
                <input type="number" :min="1" class="quantity text-large" v-model="quantity"
                    v-on:input="$emit('changeQuantity', props.info.id, quantity, product.id)" />
            </div>
            <div class="cost">
                <span class="text-large">{{ totalCost }}$</span>
            </div>
        </div>
        <div v-if="!props.isQuantityFixed" class="additional-buttons-container">
            <div @click="cartStore.removeFromCart(props.info.productId)" class="delete-button">
                <img src="/cross.svg" alt="delete" class="icon">
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.product-container {
    display: grid;
    grid-template-columns: min(400px, 25%) 1fr;
    width: 100%;
    max-height: 200px;
    min-width: 600px;
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
        display: flex;
        justify-content: center;
        align-items: center;

        & .image-preview {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }

    & .info-container {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        flex-grow: 2;
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
                border: 1px solid transparent;
                padding: 7px;
                text-align: center;
                width: 50%;
                transition: all .3s ease;
                outline: none;
                background-color: $input-background;
                ;

                &:focus,
                &:hover {
                    border: 1px solid #6e9dbd;
                }
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