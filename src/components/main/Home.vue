<script setup lang="ts">
import Catalog from './Catalog.vue';
import Main from './Main.vue';
import SubCategories from './Subcategories.vue';

import { shallowRef, watch } from 'vue';
import { useSessionStore } from '@storage';

const sessionStore = useSessionStore();

watch(() => sessionStore.pickedCategory, (newVal) => {
    if (newVal !== null) {
        currMain.value = SubCategories;
        return;
    }
    currMain.value = Main;
});

const currMain = shallowRef(Main);

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