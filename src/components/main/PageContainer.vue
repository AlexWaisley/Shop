<script setup lang="ts">
import Home from './Home.vue';
import Products from './Products.vue';
import Item from './Item.vue';
import { useDataStore, useSessionStore, useDisplayInfoStore } from '@storage';
const sessionStore = useSessionStore();
const displayInfoStore = useDisplayInfoStore();

import { computed, shallowRef, watch } from 'vue';
import Cart from './Cart/Cart.vue';
import Account from './Account.vue';
import ItemAdmin from './ItemAdmin.vue';

const props = defineProps<{
    cartStatus: boolean;
    accountStatus: boolean;
}>();

const currPage = shallowRef(Home);

function updatePage() {
    switch (true) {
        case displayInfoStore.isEditItemPage:
            currPage.value = ItemAdmin;
            break;
        case sessionStore.pickedItem !== null:
            currPage.value = Item;
            break;
        case displayInfoStore.productPageOpen:
            currPage.value = Products;
            break;
        case props.cartStatus:
            currPage.value = Cart;
            break;
        case props.accountStatus:
            currPage.value = Account;
            break;
        default:
            currPage.value = Home;
            break;
    }
}

const hasPickedCategories = computed(() => (sessionStore.pickedCategories?.length || 0) > 0);

watch(hasPickedCategories, updatePage, { immediate: true });
watch(() => sessionStore.pickedItem, updatePage, { immediate: true });
watch(() => displayInfoStore.productPageOpen, updatePage, { immediate: true });
watch(() => props.cartStatus, updatePage);
watch(() => props.accountStatus, updatePage);
watch(() => displayInfoStore.isEditItemPage, updatePage, { immediate: true });

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
