<script setup lang="ts">
import Catalog from '../General/Catalog.vue';
import Main from './Main.vue';
import Subcategories from '../Subcategories/Subcategories.vue';
import SubcategoriesAdmin from '@main/Admin/SubcategoriesAdmin.vue';
import { shallowRef, watch } from 'vue';
import { useDisplayInfoStore, useSessionStore } from '@storage';

const sessionStore = useSessionStore();
const currMain = shallowRef(Main);
const displayInfoStore = useDisplayInfoStore();

watch(() => displayInfoStore.categoryPageStatus, () => {
    if (displayInfoStore.categoryPageStatus && !displayInfoStore.adminPanelsOn)
        currMain.value = Subcategories;
    else if (displayInfoStore.categoryPageStatus && displayInfoStore.adminPanelsOn)
        currMain.value = SubcategoriesAdmin;
    else if (displayInfoStore.homeStatus)
        currMain.value = Main;
}, { immediate: true, deep: true });

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