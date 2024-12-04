<script setup lang="ts">
import Catalog from '../General/Catalog.vue';
import Query from '@main/General/Query.vue';
</script>

<template>
    <div class="home-container">
        <div class="catalog-container">
            <Catalog />
        </div>
        <div class="main-container">
            <Query />
            <RouterView></RouterView>
        </div>
    </div>
</template>
<style scoped lang="scss">
.home-container {
    display: grid;

    grid-template-columns: 250px 1fr;
    gap: 20px;

    & .main-container {
        max-width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
}
</style>