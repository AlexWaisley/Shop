<script setup lang="ts">
import SubcategoryCard from './SubcategoryCardAdmin.vue';
import { useDataStore, useSessionStore, useProductStore } from '@storage';
import { computed, ref, } from 'vue';
import AddNewCategoryForm from './AddForms/NewCategory.vue';

const sessionStore = useSessionStore();
const dataStore = useDataStore();
const productStore = useProductStore();

const addNewCategory = ref<boolean>(false);

const parentCategoryId = computed<number>(() => {
    if (sessionStore.pickedCategories === null || sessionStore.pickedCategories.length === 0) {
        return 0;
    }
    return sessionStore.pickedCategories[sessionStore.pickedCategories.length - 1].id;
});

const openProductsPage = async () => {
    await productStore.displayProductsByCategoryId(parentCategoryId.value);
}

const changeAddNewCategoryShowStatus = () => {
    addNewCategory.value = !addNewCategory.value;
}
</script>
<template>
    <div class="subcategories-container">
        <div @click="changeAddNewCategoryShowStatus" class="add-button">
            <img src="/cross.svg" alt="add new subcategory">
        </div>
        <SubcategoryCard v-if="dataStore.displayedCategories !== null && dataStore.displayedCategories.length !== 0"
            v-for="value in dataStore.displayedCategories" :info="value" />
        <div v-if="dataStore.displayedCategories.length === 0" @click="openProductsPage" class="add-button">
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