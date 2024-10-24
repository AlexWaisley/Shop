<script setup lang="ts">
import { BucketProduct } from '@models';
import { ref } from 'vue';
import { useSessionStore } from '@storage';
const sessionStorage = useSessionStore();

const props = defineProps<{
    info: BucketProduct;
    isQuantityFixed: boolean,
}>();

const quantity = ref<number>(props.info.quantity);

</script>
<template>
    <div class="product-container">
        <div class="image-container">
            <img src="/2.jpg" alt="product preview" class="image-preview" />
        </div>
        <div class="info-container">
            <div class="name">
                <span class="text-large">{{ props.info.product.name }}</span>
            </div>
            <div class="quantity-container">
                <span v-if="props.isQuantityFixed" class="text-large"> {{ quantity }}</span>
                <input v-else type="number" class="quantity text-large" v-model="quantity"
                    :oninput="sessionStorage.changeQuantityOfProductInBucket(props.info, quantity)" />
            </div>
            <div class="cost">
                <span class="text-large">{{ props.info.totalCost }}$</span>
            </div>
        </div>
        <div v-if="!props.isQuantityFixed" class="additional-buttons-container">
            <div @click="sessionStorage.removeFromBucket(props.info)" class="delete-button">
                <img src="/cross.svg" alt="delete" class="icon">
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