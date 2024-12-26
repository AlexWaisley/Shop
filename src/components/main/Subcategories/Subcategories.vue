<script setup lang="ts">
import { watch, ref, computed } from 'vue';
import SubcategoryCard from './SubcategoryCard.vue';
import { useDataStore } from '@storage';
import { useRoute, useRouter } from 'vue-router';
import { Category } from '@models';

const dataStore = useDataStore();
const route = useRoute();
const displayedCategories = ref<Category[] | null>(null);
const router = useRouter();
const displayedCategoriesNotEmpty = computed<boolean>((): boolean => {
    return displayedCategories.value === null || displayedCategories.value.length < 1;
});

watch(() => route.params.name, async () => {
    if (route.params.name) {
        displayedCategories.value = dataStore.findSubCategoriesByName(route.params.name.toString());
        if (displayedCategoriesNotEmpty) {
            const category = dataStore.findCategoryByName(route.params.name.toString());
            if (category !== null) {
                await dataStore.loadCategories(category.id);
                displayedCategories.value = dataStore.findSubCategoriesByName(route.params.name.toString());
            }
        }
        if (displayedCategories.value === null || displayedCategories.value.length < 1) {
            router.push('/' + route.params.name + "/products");
        }
    }
    console.log(displayedCategories);
}, { immediate: true });

</script>

<template>
    <div class="subcategories-container">
        <SubcategoryCard v-if="!displayedCategoriesNotEmpty" v-for="value in displayedCategories" :info="value" />
    </div>
</template>

<style scoped lang="scss">
.subcategories-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 15px;
    padding: 20px;
    justify-content: center;
    background-color: $sub-main-background-color;
    border-radius: 5px;
}
</style>