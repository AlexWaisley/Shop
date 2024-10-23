<script setup lang="ts">
import ItemCard from './ItemCard.vue';
import Catalog from './Catalog.vue';

</script>
<template>
    <div class="products-container">
        <div class="side-panel">
            <Catalog></Catalog>
            <div class="filter-container"></div>
        </div>
        <div class="products">
            <ItemCard v-for="_ in 20"></ItemCard>
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