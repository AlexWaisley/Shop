<script setup lang="ts">
import { Product } from '@models';
import ImageBlock from './ImageBlock.vue';
import { useSessionStore, useCartStore, useDisplayInfoStore, useProductStore } from '@storage';
import { ref, watch } from 'vue';
import Query from '@main/General/Query.vue';
const sessionStore = useSessionStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const displayInfo = useDisplayInfoStore();
const fullProductInfo = ref<Product | null>(sessionStore.pickedItem);

const editItem = () => {
    displayInfo.changeIsEditItem(true);
}

watch(() => productStore.productsFullInfo, () => {
    if (sessionStore.pickedItem !== null)
        fullProductInfo.value = sessionStore.pickedItem;
}, { immediate: true, deep: true })
</script>

<template>
    <div v-if="fullProductInfo !== null" class="primary-container">
        <div class="head">
            <Query></Query>
        </div>
        <div class="item-container">
            <div class="item">
                <div class="image-container">
                    <ImageBlock :full-info="fullProductInfo"></ImageBlock>
                </div>
                <div class="fast-info">
                    <div class="name-container">
                        <span class="text-large">{{ fullProductInfo.name }}</span>
                    </div>
                    <div class="cart-container">
                        <div class="price-container">
                            <span class="text-large">{{ fullProductInfo.price }}$</span>
                        </div>
                        <button :disabled="cartStore.isItemInCart(fullProductInfo.id) || !fullProductInfo.isAvailable"
                            @click="cartStore.addToCart(fullProductInfo.id, 1)" class="button">
                            <img src="/cart.svg" alt="Buy" class="icon">
                        </button>
                    </div>
                </div>
            </div>
            <div class="item-info">
                <div class="description">{{ fullProductInfo.description }}</div>
            </div>
            <div @click="editItem" v-if="displayInfo.adminPanelsOn" class="text-button">
                <span class="text-large">edit</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.primary-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    & .head {
        width: max(80%, 1000px);
    }

    & .item-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 15px;
        max-width: 1700px;
        width: max(80%, 1000px);

        & .item {
            border-radius: 15px;
            justify-content: center;
            gap: 15px;
            max-width: 100%;

            @media screen and (max-width: 1000px) {
                & {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    flex-direction: column;
                }
            }

            @media screen and (min-width: 1000px) {
                & {
                    display: grid;
                    grid-template-columns: 750px 1fr;
                }
            }

            & .fast-info {
                border-radius: 15px;
                text-overflow: ellipsis;
                display: flex;
                flex-direction: column;
                gap: 15px;

                & .name-container {
                    padding: 20px;
                    display: flex;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    border-radius: 15px 15px 0 0;
                    background-color: $item-info-background-color;
                    box-shadow: 3px 3px 3px rgb(216, 237, 255);
                }

                & .cart-container {
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    background-color: $item-info-background-color;
                    border-radius: 0 0 15px 15px;
                    box-shadow: 3px 3px 3px rgb(216, 237, 255);
                    @include icon-button(100px, 60px);
                }
            }
        }

        & .item-info {
            display: flex;
            flex-direction: column;
            gap: 15px;
            justify-content: center;
            text-align: justify;
            background-color: $item-info-background-color;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 3px 3px 3px rgb(216, 237, 255);
            width: 100%;

            & .description {
                width: 100%;
                height: 100%;
                padding: 20px;
                border-radius: 15px;
                background-color: $input-background;
            }
        }

        @include text-button(80px, 100%);
    }
}
</style>