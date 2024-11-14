<script setup lang="ts">
import InputField from '@main/General/InputField.vue';
import { useAdminFormStatusStore, useCreatingStore, useDataStore, usePreviewImagesStore } from '@storage';
import { ref } from 'vue';
import AddPhoto from './AddPhoto.vue';
import toastr from 'toastr';

const dataStore = useDataStore();
const creatingStore = useCreatingStore();
const imageStore = usePreviewImagesStore();
const formStatusStore = useAdminFormStatusStore();
const name = ref<string>("");
const parentCategory = ref<string>("");
const buttonText = ref<string>("Delete");

const category = dataStore.lastCategory;
if (category !== null)
    parentCategory.value = category.name;
const file = ref<FormData | null>(null);

const submitChanges = async () => {
    const tempCategory = dataStore.findCategoryByName(parentCategory.value)
    if (tempCategory === null || name.value === "") {
        toastr.error("broken");
        return;
    }

    await dataStore.categoryUpdate(tempCategory.id, name.value);

    if (file.value !== null && dataStore.pickedCategory !== null) {
        await creatingStore.AddNewCategoryPhoto(dataStore.pickedCategory.id, file.value);
        imageStore.loadCategoryPreviewByCategoryId(dataStore.pickedCategory.id);
    }

    closeWindow();
}
const updateFile = (fileForm: FormData) => {
    file.value = fileForm;
}

const deleteCategory = async () => {
    if (buttonText.value === "Delete") {
        buttonText.value = "Are you sure?";
        return
    }
    await dataStore.deleteCategory();
    closeWindow();
}

const closeWindow = () => {
    formStatusStore.changeCategoryEdit(false);
}
</script>

<template>
    <div class="additional-container">
        <div class="form">
            <InputField v-model="name" placeholder="Category name" type="text"></InputField>
            <InputField v-model="parentCategory" placeholder="Parent category name" type="text"></InputField>
            <AddPhoto @file-changed="updateFile"></AddPhoto>
        </div>
        <button @click="submitChanges">Submit changes</button>
        <button @click="closeWindow">Cancel</button>
        <button @click="deleteCategory">{{ buttonText }}</button>
    </div>
</template>

<style scoped lang="scss">
.additional-container {
    width: 100%;
    height: 80%;
    min-height: 200px;
    border-radius: 15px;
    padding: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;

    & .form {
        display: flex;
        gap: 40px;
        flex-direction: column;
        justify-content: center;
        width: 50%;

        & .buttons-container {
            width: 100%;
            display: flex;
            justify-content: space-around;
        }
    }

    &>button {
        width: 50%;
    }
}
</style>