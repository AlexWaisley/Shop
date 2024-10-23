<script setup lang="ts">
import Catalog from './Catalog.vue';
import Main from './Main.vue';
import SubCategories from './Subcategories.vue';

import { shallowRef } from 'vue';

const currMain = shallowRef(SubCategories);

</script>
<template>
    <div class="home-container">
        <div class="catalog-container">
            <Catalog />
        </div>
        <div class="main-container">
            <component :is="currMain" />
        </div>
    </div>
</template>
<style scoped lang="scss">
.home-container {
    display: grid;

    grid-template-columns: 300px 1fr;

    & .main-container {
        max-width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 20px;
    }
}
</style>