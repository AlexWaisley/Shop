<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDataStore, useSessionStore } from '@storage';
import { OrderItemDto, ProductDto } from '@models';
import Decimal from 'decimal.js';
const sessionStorage = useSessionStore();
const dataStore = useDataStore();

const props = defineProps<{
    info: OrderItemDto;
}>();

const quantity = ref<number>(props.info.quantity);

const product = ref<ProductDto | null>(dataStore.getProductById(props.info.productId));
const totalCost = computed<Decimal>(() => {
    if (product.value === null) {
        return new Decimal(1);
    }

    return new Decimal(product.value.price).times(new Decimal(quantity.value));
});

</script>
<template>
    <div class="product-container">
        <div class="image-container">
            <img src="/2.jpg" alt="product preview" class="image-preview" />
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
    background-color: aliceblue;
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