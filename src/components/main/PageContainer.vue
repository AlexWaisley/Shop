<script setup lang="ts">
import Home from './Home.vue';
import Products from './Products.vue';
import Item from './Item.vue';
import { useSessionStore } from '@storage';
const sessionStore = useSessionStore();

import { shallowRef, watch } from 'vue';

const currPage = shallowRef(Home);

watch(() => sessionStore.pickedItem, (newVal) => {
    if (newVal !== null) {
        currPage.value = Item;
        return;
    }
}, { immediate: true });

watch(() => sessionStore.pickedSubcategory, (newVal) => {
    if (newVal !== null) {
        currPage.value = Products;
        return;
    }
}, { immediate: true });

watch(() => sessionStore.pickedCategory, (newVal) => {
    if (newVal === null) {
        currPage.value = Home;
        return;
    }
}, { immediate: true });

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
