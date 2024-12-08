<script setup lang="ts">
import { Category } from '@models';
import { useAdminFormStatusStore, useDataStore } from '@storage';
import SubcategoryImage from '@main/General/SubcategoryImage.vue';
import WindowForm from './WindowForm.vue';

const formStatusStore = useAdminFormStatusStore();
const dataStore = useDataStore();

const props = defineProps<{
    info: Category;
}>();

const switchMenuStatusChange = () => {
    dataStore.pickedCategory = props.info;
    formStatusStore.changeCategoryEdit(true);
}
</script>

<template>
    <div class="subcategory-card-container">
        <div @click="switchMenuStatusChange" class="edit-button">
            <img src="/dots.svg" alt="Edit">
        </div>
        <RouterLink :to="'/admin/' + props.info.name">
            <SubcategoryImage :info="props.info"></SubcategoryImage>
            <div class="info-container">
                <div class="info">
                    <div class="name">
                        <span class="text-large-bold">
                            {{ props.info.name }}
                        </span>
                    </div>
                </div>
            </div>
        </RouterLink>
        <Teleport v-if="formStatusStore.categoryEdit" to="body">
            <WindowForm></WindowForm>
        </Teleport>
    </div>
</template>
<style scoped lang="scss">
.subcategory-card-container {
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
    position: relative;

    & .info-container {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;

        & .info {
            display: flex;
            width: 100%;
            justify-content: space-around;
        }
    }

    & .edit-button {
        position: absolute;
        top: 10px;
        right: 5px;
        z-index: 5;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3px;
        transition: background-color .3s ease;

        &:hover {
            background-color: rgb(100, 171, 199);
        }
    }

    &:hover {
        cursor: pointer;
        box-shadow: rgb(80, 160, 192) 0px 0px 7px 0px;
    }
}
</style>