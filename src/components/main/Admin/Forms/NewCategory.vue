<script setup lang="ts">
import { ref } from 'vue';
import InputField from '@main/General/InputField.vue';
import { useAdminFormStatusStore, useCreatingStore, useDataStore } from '@storage';
import AddPhoto from './AddPhoto.vue';
import { useRoute } from 'vue-router';
const creatingStore = useCreatingStore();
const dataStore = useDataStore();
const formStatusStore = useAdminFormStatusStore();
const categoryName = ref<string>("");
const file = ref<FormData | null>(null);
const route = useRoute();

const addNewCategory = async () => {
    if (!route.params.name) {
        await creatingStore.AddNewCategory({ name: categoryName.value, parentCategoryId: 0 });
        closeWindow();
        return;
    }
    const pickedCategory = dataStore.findCategoryByName(route.params.name.toString());
    if (pickedCategory === null) {
        await creatingStore.AddNewCategory({ name: categoryName.value, parentCategoryId: 0 });
    }
    else {
        await creatingStore.AddNewCategory({ name: categoryName.value, parentCategoryId: pickedCategory.id });
    }
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
            <button class="text-button" type="reset" @click="closeWindow">
                <span class="text-large">Cancel</span>
            </button>
            <button class="text-button" type="submit">
                <span class="text-large">Submit</span>
            </button>
        </div>
    </form>
</template>
<style scoped lang="scss">
.form {
    display: flex;
    gap: 40px;
    flex-direction: column;
    width: 70%;
    overflow: auto;
    max-height: 100%;
    padding: 20px;

    & .buttons-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        @include text-button(40px, 45%);
    }
}
</style>