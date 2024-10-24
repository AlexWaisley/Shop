<script setup lang="ts">
import ItemCard from './ItemCard.vue';
import Catalog from './Catalog.vue';
import { useSessionStore } from '@storage';
import { Item } from '@models';
import { ref, watch } from 'vue';

const sessionStore = useSessionStore();

const items = ref<Item[] | null>(sessionStore.displayedProducts);

watch(() => sessionStore.displayedProducts, (newVal) => {
    items.value = newVal;
}, { immediate: true });


</script>
<template>
    <div class="products-container">
        <div class="side-panel">
            <Catalog></Catalog>
            <div class="filter-container"></div>
        </div>
        <div class="products">
            <ItemCard v-if="items !== null && items.length !== 0" v-for="value in items" :info="value"></ItemCard>
            <span v-else class="text-large">Sorry, there doesn't seem to be anything like that</span>
        </div>
    </div>
</template>
<style scoped lang="scss">
.products-container {
    display: flex;
    width: 100%;
    gap: 15px;

    & .side-panel {
        min-width: 200px;
        display: flex;
        flex-direction: column;

    }

    & .products {
        padding: 20px;
        background-color: aliceblue;
        box-shadow: 3px 3px 3px rgb(207, 228, 246);
        border-radius: 15px;
        height: 100%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: center;
    }
}
</style>