<script setup lang="ts">
import Home from './Home.vue';
import Products from './Products.vue';
import Item from './Item.vue';
import { useSessionStore } from '@storage';
const sessionStore = useSessionStore();

import { shallowRef, watch } from 'vue';
import Bucket from './bucket/Bucket.vue';
import Account from './Account.vue';

const props = defineProps<{
    bucketStatus: boolean;
    accountStatus: boolean;
}>();
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
    currPage.value = Home;
}, { immediate: true });

watch(() => sessionStore.displayedProducts, (newVal) => {
    if (newVal !== null) {
        currPage.value = Products;
        return;
    }
    currPage.value = Home;

}, { immediate: true });

watch(() => sessionStore.pickedCategory, () => {
    currPage.value = Home;
}, { immediate: true });


watch(() => props.bucketStatus, (newVal) => {
    if (newVal) {
        currPage.value = Bucket;
        return;
    }
    if (props.accountStatus) {
        return;
    }
    currPage.value = Home;
})

watch(() => props.accountStatus, (newVal) => {
    if (newVal) {
        currPage.value = Account;
        return;
    }
    if (props.bucketStatus) {
        return;
    }
    currPage.value = Home;
})

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
