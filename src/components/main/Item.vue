<script setup lang="ts">
import { Product } from '@models';
import ImageBlock from './Item/ImageBlock.vue';
import SpecsBlock from './Item/SpecsBlock.vue';
import { useSessionStore, useDataStore, useCartStore } from '@storage';
import { onMounted, ref } from 'vue';
const sessionStore = useSessionStore();
const dataStore = useDataStore();
const cartStore = useCartStore();
const fullProductInfo = ref<Product | null>(null);

const id = sessionStore.pickedItem?.id;

onMounted(async () => {
    if (id !== undefined)
        fullProductInfo.value = await dataStore.getFullProductById(id);
})

</script>
<template>
    <div v-if="fullProductInfo !== null" class="item-container">
        <div class="item">
            <div class="image-container">
                <ImageBlock></ImageBlock>
            </div>
            <div class="fast-info">
                <div class="name-container">
                    <span class="text-large">{{ fullProductInfo.name }}</span>
                </div>
                <div class="bucket-container">
                    <div class="price-container">
                        <span class="text-large">{{ fullProductInfo.price.toFixed(2) }}$</span>
                    </div>
                    <button :disabled="cartStore.isItemInCart(fullProductInfo.id)"
                        @click="cartStore.addToCart(fullProductInfo.id, 1)" class="buy-button">
                        <span class="text-large-bold">Buy</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="item-info">
            <div class="description">{{ fullProductInfo.description }}</div>
            <div class="specs">
                <SpecsBlock></SpecsBlock>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.item-container {
    height: 100%;
    max-width: 1700px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    & .item {
        display: flex;
        border-radius: 15px;
        justify-content: center;
        gap: 15px;

        & .fast-info {
            border-radius: 15px;
            min-width: 400px;
            text-overflow: ellipsis;
            display: flex;
            flex-direction: column;
            gap: 15px;

            & .name-container {
                padding: 20px;
                display: flex;
                width: 400px;
                overflow: hidden;
                text-overflow: ellipsis;
                border-radius: 15px 15px 0 0;
                background-color: aliceblue;
                box-shadow: 3px 3px 3px rgb(216, 237, 255);
            }

            & .bucket-container {
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                background-color: aliceblue;
                border-radius: 0 0 15px 15px;
                box-shadow: 3px 3px 3px rgb(216, 237, 255);

                & .buy-button {
                    background-color: skyblue;
                    user-select: none;
                    padding: 10px;
                    border-radius: 15px;
                    transition: all .5s ease;

                    &:hover {
                        cursor: pointer;
                        background-color: rgb(94, 175, 208);
                    }
                }
            }
        }
    }

    & .item-info {
        display: flex;
        flex-direction: column;
        gap: 15px;
        justify-content: center;
        text-align: justify;
        background-color: aliceblue;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 3px 3px 3px rgb(216, 237, 255);

        & .description {
            width: 100%;
            height: 100%;
            padding: 20px;
            border-radius: 15px;
            background-color: rgb(227, 242, 255);
            box-shadow: 3px 3px 3px rgb(216, 237, 255);
        }


    }
}
</style>