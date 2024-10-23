<script setup lang="ts">
import Home from './Home.vue';
import Products from './Products.vue';
import Item from './Item.vue';

import { shallowRef } from 'vue';

const currPage = shallowRef(Item);
</script>

<template>
    <div class="page-container">
        <component :is="currPage" />
    </div>
</template>

<style scoped lang="scss">
.page-container {
    min-height: 500px;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 80px;
    padding: 20px;
}
</style>
