<script setup lang="ts">
import Home from './Home/Home.vue';
import Products from './Products/Products.vue';
import Item from './Item/Item.vue';
import { useSessionStore, useDisplayInfoStore } from '@storage';
const sessionStore = useSessionStore();
const displayInfoStore = useDisplayInfoStore();

import { computed, shallowRef, watch } from 'vue';
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
            currPage.value = Cart;
            break;
        case displayInfoStore.accountInfoStatus:
            currPage.value = Account;
            break;
        default:
            currPage.value = Home;
            break;
    }
}


const hasPickedCategories = computed(() => (sessionStore.pickedCategories?.length || 0) > 0);

watch(() => displayInfoStore.accountInfoStatus, updatePage, { immediate: true });
watch(() => displayInfoStore.productPageOpen, updatePage, { immediate: true });
watch(() => displayInfoStore.cartStatus, updatePage);
watch(() => displayInfoStore.productFullInfoPageStatus, updatePage);
watch(() => displayInfoStore.isEditItemPage, updatePage, { immediate: true });
watch(() => displayInfoStore.homeStatus, updatePage, { immediate: true });

</script>

<template>
    <div class="page-container">
        <nav class="query">
            <div @click="sessionStore.clearAll" v-if="hasPickedCategories" class="prop">
                <span class="text-small">Home</span>
            </div>
            <div v-for="category in sessionStore.pickedCategories" @click="sessionStore.pickCategory(category)"
                v-if="hasPickedCategories" class="prop">
                <span class="text-small">{{ category.name }}</span>
            </div>
        </nav>
        <component :is="currPage" />
    </div>
</template>

<style scoped lang="scss">
.page-container {
    min-height: 600px;
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-top: 80px;
    padding: 20px;

    & .query {
        display: flex;
        margin-left: 250px;

        & .prop {
            cursor: pointer;

            & span {
                &:hover {
                    text-decoration: underline;
                }
            }

            &::before {
                content: '-';
            }

            &:first-child {
                &::before {
                    content: '';
                }
            }
        }
    }
}
</style>
