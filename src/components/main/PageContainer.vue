<script setup lang="ts">
import Home from './Home/Home.vue';
import Products from './Products/Products.vue';
import Item from './Item/Item.vue';
import { useDisplayInfoStore } from '@storage';
const displayInfoStore = useDisplayInfoStore();

import { shallowRef, watch } from 'vue';
import Cart from './Cart/Cart.vue';
import Account from './Account/Account.vue';
import ItemAdmin from './Admin/ItemAdmin.vue';
import ProductsAdmin from './Admin/ProductsAdmin.vue';

const currPage = shallowRef(Home);

function updatePage() {
    switch (true) {
        case displayInfoStore.isEditItemPage:
            currPage.value = ItemAdmin;
            break;
        case displayInfoStore.productFullInfoPageStatus:
            currPage.value = Item;
            break;
        case displayInfoStore.productPageOpen && displayInfoStore.adminPanelsOn:
            currPage.value = ProductsAdmin;
            break;
        case displayInfoStore.productPageOpen:
            currPage.value = Products;
            break;
        case displayInfoStore.cartStatus:
            console.log("aboba");
            currPage.value = Cart;
            break;
        case displayInfoStore.accountInfoStatus:
            currPage.value = Account;
            break;
        case displayInfoStore.homeStatus:
            console.log("sugoma");
            currPage.value = Home;
            break;
        default:
            break;
    }
}



watch(() => displayInfoStore.accountInfoStatus, updatePage, { immediate: true });
watch(() => displayInfoStore.productPageOpen, updatePage, { immediate: true });
watch(() => displayInfoStore.cartStatus, updatePage, { immediate: true });
watch(() => displayInfoStore.productFullInfoPageStatus, updatePage);
watch(() => displayInfoStore.isEditItemPage, updatePage, { immediate: true });
watch(() => displayInfoStore.homeStatus, updatePage, { immediate: true });

</script>

<template>
    <div class="page-container">
        <component :is="currPage" />
    </div>
</template>

<style scoped lang="scss">
.page-container {
    display: flex;
    flex-direction: column;
    min-height: 600px;
    flex: 1;
    width: 100%;
    gap: 7px;
    padding: 20px;
}
</style>
