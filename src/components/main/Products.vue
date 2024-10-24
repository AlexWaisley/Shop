<script setup lang="ts">
import ItemCard from './ItemCard.vue';
import Catalog from './Catalog.vue';
import { useSessionStore, useHardStore } from '@storage';
import { Item } from '@models';
import { ref, watch } from 'vue';

const sessionStore = useSessionStore();
const hardStore = useHardStore();


const items = ref<Item[] | null>(null);

watch(() => sessionStore.pickedSubcategory, () => {
    if (sessionStore.pickedSubcategory === null) {
        return;
    }
    const id = sessionStore.pickedSubcategory.id;
    console
    const subcategoriesList = hardStore.itemList.filter(x => x.subCategoryId === id);
    items.value = subcategoriesList;
}, { immediate: true });


</script>
<template>
    <div class="products-container">
        <div class="side-panel">
            <Catalog></Catalog>
            <div class="filter-container"></div>
        </div>
        <div class="products">
            <ItemCard v-for="value in items" :info="value" @click="sessionStore.pickItem(value)"></ItemCard>
        </div>
    </div>
</template>
<style scoped lang="scss">
.products-container {
    display: flex;
    width: 100%;

    & .side-panel {
        min-width: 200px;
        display: flex;
        flex-direction: column;

    }

    & .products {
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: center;
    }
}
</style>