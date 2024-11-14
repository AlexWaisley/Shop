<script setup lang="ts">
import { ref } from 'vue';
import InputField from '@main/General/InputField.vue';
import { useAdminFormStatusStore, useCreatingStore, useDataStore } from '@storage';
import AddPhoto from './AddPhoto.vue';
const creatingStore = useCreatingStore();
const dataStore = useDataStore();
const formStatusStore = useAdminFormStatusStore();
const categoryName = ref<string>("");
const file = ref<FormData | null>(null);

const addNewCategory = async () => {
    if (dataStore.lastCategory === null)
        return
    await creatingStore.AddNewCategory({ name: categoryName.value, parentCategoryId: dataStore.lastCategory.id });

    const category = dataStore.findCategoryByName(categoryName.value);

    if (category !== null && file.value !== null) {
        creatingStore.AddNewCategoryPhoto(category.id, file.value);
    }
    closeWindow();
}

const updateFile = (fileForm: FormData) => {
    file.value = fileForm;
}

const closeWindow = () => {
    formStatusStore.changeNewCategoryStatus(false);
}
</script>

<template>
    <form @submit.prevent="addNewCategory" class="form">
        <InputField v-model="categoryName" type="text" placeholder="Category name"></InputField>
        <AddPhoto @file-changed="updateFile"></AddPhoto>
        <div class="buttons-container">
            <button type="reset" @click="closeWindow">Cancel</button>
            <button type="submit">Submit</button>
        </div>
    </form>
</template>
<style scoped lang="scss">
.form {
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
</style>