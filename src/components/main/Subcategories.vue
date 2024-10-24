<script setup lang="ts">
import { Subcategory } from '@models';
import SubcategoryCard from './SubcategoryCard.vue';
import { useSessionStore, useHardStore } from '@storage';
import { ref, watch } from 'vue';

const sessionStore = useSessionStore();
const hardStore = useHardStore();

const subcategories = ref<Subcategory[] | null>(null);

watch(() => sessionStore.pickedCategory, () => {
    if (sessionStore.pickedCategory === null) {
        return;
    }
    const id = sessionStore.pickedCategory.id;
    console
    const subcategoriesList = hardStore.subCategoryList.filter(x => x.categoryId === id);
    subcategories.value = subcategoriesList;
}, { immediate: true });

</script>
<template>
    <div class="subcategories-container">
        <SubcategoryCard v-for="value in subcategories" :info="value" />
    </div>
</template>
<style scoped lang="scss">
.subcategories-container {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    min-width: 1200px;
    gap: 15px;
    padding: 20px;
    justify-content: center;
    background-color: aquamarine;
}
</style>