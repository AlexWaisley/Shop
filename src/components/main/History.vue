<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import ItemCard from './ItemCard.vue';
import { useSessionStore } from '@storage';
import { Item } from '@models';

const sessionStore = useSessionStore();

const history = ref<Item[] | null>(null);

watch(() => sessionStore.history, (newVal) => {
    if (newVal !== null) {
        history.value = newVal.reverse();
        return;
    }
}, { immediate: true });

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
    height: 420px;
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