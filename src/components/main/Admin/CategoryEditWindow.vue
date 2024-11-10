<script setup lang="ts">
import InputField from '@main/General/InputField.vue';
import { Category } from '@models';
import { useCreatingStore, useDataStore, usePreviewImagesStore } from '@storage';
import { ref } from 'vue';
import AddPhoto from './AddForms/AddPhoto.vue';
import toastr from 'toastr';

const props = defineProps<{
    category: Category
}>();
const emits = defineEmits<{
    (e: 'close'): void,
}>();

const dataStore = useDataStore();
const creatingStore = useCreatingStore();
const imageStore = usePreviewImagesStore();
const name = ref<string>(props.category.name);
const parentCategory = ref<string>("");
const buttonText = ref<string>("Delete");


const category = dataStore.findCategoryById(props.category.parentCategory);
if (category !== null)
    parentCategory.value = category.name;
const file = ref<FormData | null>(null);

const submitChanges = async () => {
    const tempCategory = dataStore.findCategoryByName(parentCategory.value)
    if (tempCategory === null || name.value === "") {
        toastr.error("broken");
        return;
    }

    await dataStore.categoryUpdate(props.category.id, tempCategory.id, name.value);

    if (file.value !== null) {
        await creatingStore.AddNewCategoryPhoto(props.category.id, file.value);
        imageStore.loadCategoryPreviewByCategoryId(props.category.id);
    }

    emits('close');
}
const updateFile = (fileForm: FormData) => {
    file.value = fileForm;
}

const deleteCategory = async () => {
    if (buttonText.value === "Delete") {
        buttonText.value = "Are you sure?";
        return
    }
    await dataStore.deleteCategory(props.category.id);
    emits('close');
}
</script>

<template>
    <div class="container">
        <div class="form-container">
            <div class="form">
                <InputField v-model="name" placeholder="Category name" type="text"></InputField>
                <InputField v-model="parentCategory" placeholder="Parent category name" type="text"></InputField>
                <AddPhoto @file-changed="updateFile"></AddPhoto>
            </div>
            <button @click="submitChanges">Submit changes</button>
            <button @click="$emit('close')">Cancel</button>
            <button @click="deleteCategory">{{ buttonText }}</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    background-color: rgba(0, 0, 0, 0.105);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 7;

    & .form-container {
        width: 50%;
        height: 60%;
        min-height: 200px;
        background-color: rgb(187, 224, 238);
        border-radius: 15px;
        padding: 7px;
        display: flex;
        justify-content: center;
        align-items: center;

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

    }

}
</style>