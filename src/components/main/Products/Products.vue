<script setup lang="ts">
import ItemCard from './ItemCard.vue';
import Catalog from '../General/Catalog.vue';
import { useDataStore, useProductStore } from '@storage';
import { ProductDto } from '@models';
import { ref, watch } from 'vue';
import Query from '@main/General/Query.vue';
import { useRoute } from 'vue-router';

const dataStore = useDataStore();
const productStore = useProductStore();
const route = useRoute();

const items = ref<ProductDto[] | null>(productStore.displayedProducts);

watch(() => route.params, async () => {
    if (route.params.name) {
        const category = dataStore.findCategoryByName(route.params.name.toString());
        if (!category)
            return;
        await productStore.displayProductsByCategoryId(category.id);
    }
    items.value = productStore.displayedProducts;
}, { immediate: true });

const oneMore = async () => {
}
</script>
<template>
    <div class="products-container">
        <div class="side-panel">
            <Catalog></Catalog>
            <div class="filter-container"></div>
        </div>
        <div class="products">
            <div class="products-query">
                <Query />
            </div>
            <div class="products-main">
                <ItemCard v-if="items !== null && items.length !== 0" v-for="value in items" :info="value"></ItemCard>
                <span v-else class="text-large">Sorry, there doesn't seem to be
                    anything like that</span>
                <div v-if="items && items.length % 20 === 0 && items.length !== 0" @click="oneMore"
                    class="loader-button">
                    <span class="text-large">Load more</span>
                </div>
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
        display: flex;
        flex-direction: column;
        width: 100%;

        & .products-main {
            padding: 20px;
            background-color: $sub-main-background-color;
            border-radius: 5px;
            height: 100%;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: center;
            align-items: center;

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
}
</style>