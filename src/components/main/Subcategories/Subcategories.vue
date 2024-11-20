<script setup lang="ts">
import SubcategoryCard from './SubcategoryCard.vue';
import { useDataStore } from '@storage';

const dataStore = useDataStore();

</script>

<template>
    <div class="subcategories-container">
        <SubcategoryCard v-if="dataStore.displayedCategories !== null && dataStore.displayedCategories.length !== 0"
            v-for="value in dataStore.displayedCategories" :info="value" />
    </div>
</template>

<style scoped lang="scss">
.subcategories-container {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    gap: 15px;
    padding: 20px;
    justify-content: center;
    background-color: $sub-main-background-color;
    border-radius: 5px;
}
</style>