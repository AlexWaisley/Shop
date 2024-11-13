<script setup lang="ts">
import { Product } from '@models';
import ImageBlock from './ImageBlock.vue';
import SpecsBlock from './SpecsBlock.vue';
import { useSessionStore, useCartStore, useDisplayInfoStore, useProductStore } from '@storage';
import { onMounted, ref, watch } from 'vue';
const sessionStore = useSessionStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const displayInfo = useDisplayInfoStore();
const fullProductInfo = ref<Product | null>(null);

const id = sessionStore.pickedItem?.id;

onMounted(async () => {
    if (id !== undefined)
        fullProductInfo.value = await productStore.getFullProductById(id);
})

const editItem = () => {
    displayInfo.changeIsEditItem(true);
}

watch(() => productStore.productsFullInfo, async () => {
    if (id !== undefined) {
        fullProductInfo.value = await productStore.getFullProductById(id);
    }
}, { immediate: true, deep: true })
</script>

<template>
    <div v-if="fullProductInfo !== null" class="primary-container">
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
                            @click="cartStore.addToCart(fullProductInfo.id, 1)" class="buy-button">
                            <img src="/cart.svg" alt="Buy">
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
            <div @click="editItem" v-if="displayInfo.adminPanelsOn" class="edit-item-button">
                <span class="text-large">edit</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.primary-container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;


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


            & .image-container {
                max-width: 100%;
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
                    background-color: aliceblue;
                    box-shadow: 3px 3px 3px rgb(216, 237, 255);
                }

                & .cart-container {
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
                        width: 100px;
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
            width: 100%;

            & .description {
                width: 100%;
                height: 100%;
                padding: 20px;
                border-radius: 15px;
                background-color: rgb(227, 242, 255);
                box-shadow: 3px 3px 3px rgb(216, 237, 255);
            }
        }

        & .edit-item-button {
            width: 100%;
            height: 80px;
            background-color: skyblue;
            border-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all .5s ease;

            &:hover {
                cursor: pointer;
                background-color: rgb(104, 187, 219);
            }
        }
    }
}
</style>