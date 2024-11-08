<script setup lang="ts">
import { computed } from 'vue';
import ItemCard from '../Products/ItemCard.vue';
import { useProductStore, useSessionStore } from '@storage';
import { ProductDto } from '@models';

const sessionStore = useSessionStore();
const productStore = useProductStore();
const history = computed<ProductDto[]>(() => {
    if (!sessionStore.history) return [];
    if (productStore.products === null || sessionStore.history === null) return [];

    const productMap = new Map(productStore.products.map(product => [product.id, product]));

    const result = sessionStore.history.map(historyId => productMap.get(historyId)).filter(product => product !== undefined).reverse();

    return result;
});

const isNeededToShow = computed<boolean>(() => {
    return sessionStore.history !== null;
});

</script>
<template>
    <div v-if="isNeededToShow" class="history-container">
        <div class="history">
            <div class="label">
                <span class="text-large-bold">History</span>
            </div>
            <div class="items-container">
                <ItemCard v-for="value in history" :info="value"></ItemCard>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.history-container {
    height: 430px;
    padding: 20px;
    background-color: rgb(0, 225, 255);
    border-radius: 15px;
    width: 100%;
    overflow-x: auto;

    & .history {
        display: flex;
        max-width: 100%;
        flex-direction: column;
        gap: 15px;
        overflow-x: auto;

        & .items-container {
            display: flex;
            max-width: 100%;
            gap: 15px;
            padding-bottom: 10px;
            overflow-x: auto;
        }
    }
}
</style>