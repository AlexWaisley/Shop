<script setup lang="ts">
import Catalog from '../General/Catalog.vue';
import Main from './Main.vue';
import SubCategories from '../Subcategories/Subcategories.vue';

import { computed, shallowRef, watch } from 'vue';
import { useSessionStore } from '@storage';

const sessionStore = useSessionStore();
const currMain = shallowRef(Main);

const hasPickedCategories = computed(() => (sessionStore.pickedCategories?.length || 0) > 0);

watch(hasPickedCategories, () => {
    if (hasPickedCategories.value)
        currMain.value = SubCategories;
    else
        currMain.value = Main;
}, { immediate: true });

</script>
<template>
    <div class="home-container">
        <div class="catalog-container">
            <Catalog />
        </div>
        <div class="main-container">
            <component :is="currMain" />
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
    }
}
</style>