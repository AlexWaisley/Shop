<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
import SubcategoryCard from './SubcategoryCard.vue';
import { useDataStore } from '@storage';
import { useRoute } from 'vue-router';
import { Category } from '@models';

const dataStore = useDataStore();
const route = useRoute();
const displayedCategories = ref<Category[] | null>(null);
const load = () => {
    if (route.params.name) {
        let parentCategory = dataStore.categories?.find(x => x.name === route.params.name);
        if (parentCategory !== undefined) {
            const res = dataStore.categories?.filter(x => x.parentCategory === parentCategory!.id);
            if (res) {
                displayedCategories.value = res;
                return;
            }
        }
        parentCategory = dataStore.rootCategories?.find(x => x.name === route.params.name);
        if (parentCategory !== undefined) {
            const res = dataStore.categories?.filter(x => x.parentCategory === parentCategory!.id);
            if (res) {
                displayedCategories.value = res;
                return;
            }
        }
    }
    displayedCategories.value = [];
};

onMounted(async () => {
    load();
    if (displayedCategories.value === null) {
        if (route.params.name) {
            const category = dataStore.findCategoryByName(route.params.name.toString());
            if (category !== null)
                dataStore.loadCategories(category.id);
        }
    }
});

watch(() => route.params.name, () => {
    load();
}, { immediate: true });

</script>

<template>
    <div class="subcategories-container">
        <SubcategoryCard v-if="displayedCategories !== null && displayedCategories.length !== 0"
            v-for="value in displayedCategories" :info="value" />
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