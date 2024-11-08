<script setup lang="ts">
import { Product } from '@models';
import ImageBlock from '../Item/ImageBlock.vue';
import SpecsBlock from '../Item/SpecsBlock.vue';
import { useSessionStore, useCartStore, useDisplayInfoStore, useProductStore } from '@storage';
import { onMounted, ref } from 'vue';
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

</script>
<template>
    <div v-if="fullProductInfo !== null" class="item-container">
        <div class="item">
            <div class="image-container">
                <ImageBlock :full-info="fullProductInfo"></ImageBlock>
            </div>
            <div class="fast-info">
                <div class="name-container">
                    <span class="text-large">{{ fullProductInfo.name }}</span>
                </div>
                <div class="bucket-container">
                    <div class="price-container">
                        <span class="text-large">{{ fullProductInfo.price }}$</span>
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
        <div @click="editItem" v-if="sessionStore.isCurrUserAdmin()" class="edit-item-button">
            <span class="text-large">edit</span>
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
</style>