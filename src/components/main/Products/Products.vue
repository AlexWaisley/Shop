<script setup lang="ts">
import ItemCard from './ItemCard.vue';
import Catalog from '../General/Catalog.vue';
import { useDataStore, useProductStore, useSessionStore } from '@storage';
import { ProductDto } from '@models';
import { ref, watch } from 'vue';

const sessionStore = useSessionStore();
const dataStore = useDataStore();
const productStore = useProductStore();

const items = ref<ProductDto[] | null>(productStore.displayedProducts);

watch(() => productStore.displayedProducts, (newVal) => {
    items.value = newVal;
}, { immediate: true });

const oneMore = async () => {
    if (sessionStore.pickedCategories !== null)
        await dataStore.loadCategories(sessionStore.pickedCategories[sessionStore.pickedCategories.length - 1].id);
}
</script>
<template>
    <div class="products-container">
        <div class="side-panel">
            <Catalog></Catalog>
            <div class="filter-container"></div>
        </div>
        <div class="products">
            <ItemCard v-if="items !== null && items.length !== 0" v-for="value in items" :info="value"></ItemCard>
            <span v-else class="text-large">Sorry, there doesn't seem to be
                anything like that</span>
            <div v-if="items && items.length % 20 === 0 && items.length !== 0" @click="oneMore" class="loader-button">
                <span class="text-large">Load more</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.products-container {
    display: flex;
    width: 100%;
    gap: 15px;

    & .side-panel {
        min-width: 250px;
        display: flex;
        flex-direction: column;
    }

    & .products {
        padding: 20px;
        background-color: $sub-main-background-color;
        box-shadow: 3px 3px 3px rgb(207, 228, 246);
        border-radius: 15px;
        height: 100%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: center;

        & .add-button {

            min-width: 250px;
            max-width: 250px;
            height: 320px;
            overflow: hidden;
            display: grid;
            gap: 7px;
            background-color: aqua;

            border-radius: 15px;
            box-shadow: 3px 3px 3px rgb(55, 230, 230);
            transition: all .5s ease;
            justify-content: center;
            align-items: center;

            & img {
                transform: rotateZ(45deg);
            }

            &:hover {
                cursor: pointer;
                box-shadow: 12px 12px 12px rgb(97, 185, 220);

            }
        }

        & .loader-button {
            width: 100%;
            height: 80px;
            background-color: $button-color;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
            transition: all .5s ease;

            &:hover {
                background-color: rgb(95, 157, 181);
                cursor: pointer;
            }
        }
    }
}
</style>