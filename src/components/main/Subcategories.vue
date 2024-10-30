<script setup lang="ts">
import { Subcategory } from '@models';
import SubcategoryCard from './SubcategoryCard.vue';
import { useSessionStore, useHardStore } from '@storage';
import { ref, watch } from 'vue';
import AddNewCategoryForm from './AddNewCategoryForm.vue';

const sessionStore = useSessionStore();
const hardStore = useHardStore();


const addNewCategory = ref<boolean>(false);

const changeAddNewCategoryShowStatus = () => {
    addNewCategory.value = !addNewCategory.value;
}

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
        <div v-if="sessionStore.currUser?.isAdmin" @click="changeAddNewCategoryShowStatus" class="add-button">
            <img src="/cross.svg" alt="add new subcategory">
        </div>
        <SubcategoryCard v-for="value in subcategories" :info="value" />
        <Teleport v-if="addNewCategory" to="body">
            <AddNewCategoryForm @close="changeAddNewCategoryShowStatus"></AddNewCategoryForm>
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