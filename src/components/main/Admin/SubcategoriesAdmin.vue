<script setup lang="ts">
import SubcategoryCard from './SubcategoryCardAdmin.vue';
import { useDataStore, useAdminFormStatusStore } from '@storage';
import { computed, ref, watch, } from 'vue';
import WindowForm from './WindowForm.vue';
import { useRoute } from 'vue-router';
import { Category } from '@models';

const dataStore = useDataStore();
const formStatusStore = useAdminFormStatusStore();
const route = useRoute();

const changeAddNewCategoryShowStatus = () => {
    formStatusStore.changeNewCategoryStatus(true);
}

const displayedCategories = ref<Category[] | null>(null);

const displayedCategoriesNotEmpty = computed<boolean>((): boolean => {
    return displayedCategories.value === null || displayedCategories.value.length < 1;
});

watch(() => route.params.name, async () => {
    if (route.params.name) {
        displayedCategories.value = dataStore.findSubCategoriesByName(route.params.name.toString());
        if (displayedCategoriesNotEmpty.value) {
            const category = dataStore.findCategoryByName(route.params.name.toString());
            if (category !== null) {
                await dataStore.loadCategories(category.id);
                displayedCategories.value = dataStore.findSubCategoriesByName(route.params.name.toString());
            }
        }
    }
}, { immediate: true });
</script>
<template>
    <div class="subcategories-container">
        <div @click="changeAddNewCategoryShowStatus" class="button add">
            <img src="/cross.svg" alt="add new subcategory">
        </div>
        <SubcategoryCard v-if="displayedCategoriesNotEmpty" v-for="value in displayedCategories" :info="value" />
        <RouterLink :to="'/' + route.params.name + '/admin/products'">
            <div v-if="!displayedCategoriesNotEmpty" class="button continue">
                <img src="/switch.svg" alt="Go to products">
            </div>
        </RouterLink>
        <Teleport v-if="formStatusStore.newCategory" to="body">
            <WindowForm> </WindowForm>
        </Teleport>
    </div>
</template>

<style scoped lang="scss">
.subcategories-container {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    gap: 15px;
    padding: 20px;
    justify-content: center;
    background-color: $sub-main-background-color;
    border-radius: 5px;

    & .button {
        min-width: 250px;
        height: 250px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 7px;
        background-color: $card-background-color;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        transition: all .5s ease;

        &.continue>img {
            transform: rotateZ(180deg);
        }

        &.add>img {
            transform: rotateZ(45deg);
        }

        &:hover {
            cursor: pointer;
            box-shadow: rgb(80, 160, 192) 0px 0px 7px 0px;
        }
    }
}
</style>