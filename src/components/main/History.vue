<script setup lang="ts">
import ItemCard from './ItemCard.vue';
</script>
<template>
    <div class="history-container">
        <div class="history">
            <div class="label">
                <span class="text-large-bold">History</span>
            </div>
            <div class="items-container">
                <ItemCard v-for="_ in 6"></ItemCard>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.history-container {
    height: 350px;
    padding: 20px;
    background-color: rgb(0, 225, 255);
    border-radius: 15px;

    & .history {
        display: flex;
        max-width: 100%;
        flex-direction: column;
        gap: 15px;

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