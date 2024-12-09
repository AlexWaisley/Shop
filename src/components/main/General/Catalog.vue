<script setup lang="ts">
import { ref } from 'vue';
import { useAdminFormStatusStore, useDataStore, useDisplayInfoStore } from '@storage';
import WindowForm from '../Admin/WindowForm.vue';

const displayInfoStore = useDisplayInfoStore();
const formStatusStore = useAdminFormStatusStore();
const dataStore = useDataStore();

const showCategories = ref<boolean>(true);

const changeCategoriesShowStatus = () => {
    showCategories.value = !showCategories.value;
}

const changeAddNewCategoryShowStatus = () => {
    formStatusStore.changeNewCategoryStatus(true);
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

            <div v-for="value in dataStore.rootCategories" class="category">
                <RouterLink :to="'/' + (displayInfoStore.adminPanelsOn ? 'admin/' : '') + value.name">
                    <div class="catalog-over"></div>
                    <div class="over">
                        <span class="text-default">{{ value.name }}</span>
                    </div>
                </RouterLink>
            </div>
        </div>
        <Teleport v-if="formStatusStore.newCategory" to="body">
            <WindowForm></WindowForm>
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
        background-color: $catalog-head-background-color;
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
        background-color: $catalog-background;
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
                background-color: rgb(226, 241, 255);
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