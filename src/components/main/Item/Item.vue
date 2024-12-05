<script setup lang="ts">
import { Product } from '@models';
import ImageBlock from './ImageBlock.vue';
import { useCartStore, useDisplayInfoStore, useProductStore, useSessionStore } from '@storage';
import { computed, onMounted, ref } from 'vue';
import Query from '@main/General/Query.vue';
import { RouterLink, useRoute } from 'vue-router';
const productStore = useProductStore();
const cartStore = useCartStore();
const displayInfo = useDisplayInfoStore();
const fullProductInfo = ref<Product | null>(null);
const route = useRoute();
const sessionStore = useSessionStore();

const editItem = () => {
    displayInfo.changeIsEditItem(true);
}

onMounted(async () => {
    if (route.params.id) {
        fullProductInfo.value = await productStore.getFullProductById(route.params.id.toString());
        sessionStore.addToHistory(route.params.id.toString());
    }
});

const isProductAvailable = computed(() => {
    if (fullProductInfo.value)
        return cartStore.isItemInCart(fullProductInfo.value.id) || !fullProductInfo.value.isAvailable;
    return false;
})
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
                        <button :disabled="isProductAvailable" @click="cartStore.addToCart(fullProductInfo.id)"
                            class="button">
                            <img src="/cart.svg" alt="Buy" class="icon">
                        </button>
                    </div>
                </div>
            </div>
            <div class="item-info">
                <div class="description">{{ fullProductInfo.description }}</div>
            </div>
            <RouterLink :to="'/admin/item/' + route.params.id">
                <div @click="editItem" v-if="displayInfo.adminPanelsOn" class="text-button">
                    <span class="text-large">edit</span>
                </div>
            </RouterLink>
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