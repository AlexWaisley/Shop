<script setup lang="ts">
import { ref } from 'vue';
import { useHardStore, useSessionStore } from '@storage';

const hardStore = useHardStore();
const sessionStore = useSessionStore();


const showCategories = ref<boolean>(true);

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
            <div v-for="value in hardStore.categoryList" @click="sessionStore.pickCategory(value)" class="category">
                <div class="catalog-over"></div>
                <div class="over">
                    <span class="text-default">{{ value.name }}</span>
                </div>
            </div>
        </div>
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
            max-width: 200px;
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
    }
}
</style>