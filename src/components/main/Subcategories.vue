<script setup lang="ts">
import SubcategoryCard from './SubcategoryCard.vue';
</script>
<template>
    <div class="subcategories-container">
        <SubcategoryCard v-for="_ in 8" />
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
    background-color: aquamarine;
}
</style>