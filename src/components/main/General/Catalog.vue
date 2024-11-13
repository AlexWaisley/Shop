<script setup lang="ts">
import { ref } from 'vue';
import { useDataStore, useDisplayInfoStore, useSessionStore } from '@storage';
import AddNewCategoryForm from '../Admin/AddForms/NewCategory.vue';

const sessionStore = useSessionStore();
const displayInfoStore = useDisplayInfoStore();
const dataStore = useDataStore();

const showCategories = ref<boolean>(true);
const addNewCategory = ref<boolean>(false);

const changeAddNewCategoryShowStatus = () => {
    addNewCategory.value = !addNewCategory.value;
}

const changeCategoriesShowStatus = () => {
    showCategories.value = !showCategories.value;
}

</script>

<template>
    <div class="catalog">
        <div @click="changeCategoriesShowStatus" class="head">
            <span class="text-large-bold">Catalog</span>
        </div>
        <div v-if="showCategories" class="category-container">
            <div v-if="displayInfoStore.adminPanelsOn" @click="changeAddNewCategoryShowStatus" class="add-button">
                <img src="/cross.svg" alt="add new category">
            </div>
            <div v-for="value in dataStore.rootCategories" @click="sessionStore.pickCategory(value)" class="category">
                <div class="catalog-over"></div>
                <div class="over">
                    <span class="text-default">{{ value.name }}</span>
                </div>
            </div>
        </div>
        <Teleport v-if="addNewCategory" to="body">
            <AddNewCategoryForm :parent-category-id="0" @close="changeAddNewCategoryShowStatus"></AddNewCategoryForm>
        </Teleport>
    </div>
</template>

<style scoped lang="scss">
.catalog {
    max-width: 250px;
    display: flex;
    flex-direction: column;
    user-select: none;

    & .head {
        background-color: rgb(110, 168, 231);
        max-width: 250px;
        border-top-right-radius: 15px;
        padding: 10px;
        transition: all .5s ease;

        &:hover {
            box-shadow: 3px 3px 3px rgb(87, 142, 200);
            background-color: rgb(82, 141, 205);
            cursor: pointer;
        }

    }

    & .category-container {
        max-width: 250px;
        background-color: rgb(82, 189, 232);
        display: flex;
        flex-direction: column;
        gap: 7px;
        padding: 10px 0 10px 0;
        border-bottom-right-radius: 15px;


        & .category {
            display: flex;
            flex-direction: column;
            min-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            position: relative;

            & .over {
                position: absolute;
                z-index: 3;
                width: 170px;
                overflow: hidden;
                display: flex;
                align-items: center;
                height: 40px;
                padding-left: 15px;
            }

            & .catalog-over {
                z-index: 2;
                position: absolute;
                background-color: aliceblue;
                border-bottom-right-radius: 30px 40px;
                width: 90%;
                height: 40px;
                transition: all .5s ease;
                transform: translateX(-300px);
            }

            &:hover {
                cursor: pointer;

                & .catalog-over {
                    transform: translateX(0);
                }
            }
        }

        & .add-button {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all .5s ease;
            padding: 15px;

            & img {
                transform: rotateZ(45deg)
            }

            &:hover {
                cursor: pointer;
                background-color: aliceblue;
            }
        }
    }
}
</style>