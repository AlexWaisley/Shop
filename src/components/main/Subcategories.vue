<script setup lang="ts">
import SubcategoryCard from './SubcategoryCard.vue';
import { useDataStore, useSessionStore, useDisplayInfoStore } from '@storage';
import { computed, ref, watch } from 'vue';
import AddNewCategoryForm from './AddNewCategoryForm.vue';
import { Category } from '@models';

const sessionStore = useSessionStore();
const dataStore = useDataStore();
const displayInfoStore = useDisplayInfoStore();

const addNewCategory = ref<boolean>(false);

const changeAddNewCategoryShowStatus = () => {
    addNewCategory.value = !addNewCategory.value;
}

const parentCategoryId = computed<number>(() => {
    if (sessionStore.pickedCategories === null || sessionStore.pickedCategories.length === 0) {
        return 0;
    }
    return sessionStore.pickedCategories[sessionStore.pickedCategories.length - 1].id;
});

const displayedCategories = ref<Category[]>([]);

watch(() => parentCategoryId.value, async () => {
    if (dataStore.categories === null) {
        return;
    }
    if (dataStore.categories.find(x => x.parentCategory === parentCategoryId.value) === undefined) {
        displayedCategories.value = [];
        await dataStore.displayProductsByCategoryId(parentCategoryId.value);
        if (!sessionStore.isCurrUserAdmin()) {
            openProductsPage();
        }
        return;
    }
    displayedCategories.value = dataStore.categories.filter(x => x.parentCategory === parentCategoryId.value);
}, { immediate: true });

watch(() => dataStore.categories, () => {
    if (dataStore.categories === null) {
        dataStore.displayProductsByCategoryId(parentCategoryId.value);
        return;
    }
    displayedCategories.value = dataStore.categories.filter(x => x.parentCategory === parentCategoryId.value);
}, { immediate: true });

const openProductsPage = () => {
    displayInfoStore.changeProductPageOpenStatus(true);
}

</script>
<template>
    <div class="subcategories-container">
        <div v-if="sessionStore.currUser?.isAdmin" @click="changeAddNewCategoryShowStatus" class="add-button">
            <img src="/cross.svg" alt="add new subcategory">
        </div>
        <SubcategoryCard v-if="displayedCategories !== null && displayedCategories.length !== 0"
            v-for="value in displayedCategories" :info="value" />
        <div v-if="sessionStore.currUser?.isAdmin && displayedCategories.length === 0" @click="openProductsPage"
            class="add-button">
            <img src="/switch.svg" alt="Go to products">
        </div>
        <Teleport v-if="addNewCategory" to="body">
            <AddNewCategoryForm :parent-category-id="parentCategoryId" @close="changeAddNewCategoryShowStatus">
            </AddNewCategoryForm>
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
    background-color: aquamarine;

    & .add-button {
        min-width: 250px;
        height: 250px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 7px;
        background-color: aqua;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        box-shadow: 3px 3px 3px rgb(55, 230, 230);
        transition: all .5s ease;

        & img {
            transform: rotateZ(45deg);
        }

        &:hover {
            cursor: pointer;
            box-shadow: 12px 12px 12px rgb(97, 185, 220);

        }
    }
}
</style>