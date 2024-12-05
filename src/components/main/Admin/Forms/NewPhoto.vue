<script setup lang="ts">
import { ref } from 'vue';
import { useAdminFormStatusStore, useCreatingStore, useProductStore } from '@storage';
import AddPhoto from './AddPhoto.vue';
import { useRoute } from 'vue-router';

const creatingStore = useCreatingStore();
const formStatusStore = useAdminFormStatusStore();
const productStore = useProductStore();
const route = useRoute();
const file = ref<FormData | null>(null);

const addNewPhoto = async () => {
    if (!route.params.id)
        return;
    const item = await productStore.getProductById(route.params.id.toString());
    if (file.value !== null && item !== null)
        await creatingStore.AddNewProductPhoto(item.id, file.value);
    closeWindow();
}

const updateFile = (fileForm: FormData) => {
    file.value = fileForm;
}

const closeWindow = () => {
    formStatusStore.changeNewPhotoStatus(false);
}
</script>
<template>
    <form @submit.prevent="addNewPhoto" class="form">
        <AddPhoto @file-changed="updateFile"></AddPhoto>
        <div class="button-container">
            <button class="text-button" type="button" @click="closeWindow">
                <span class="text-large">Close</span>
            </button>
            <button class="text-button" type="submit">
                <span class="text-large">Add</span>
            </button>
        </div>
    </form>
</template>
<style scoped lang="scss">
.form {
    display: flex;
    gap: 15px;
    flex-direction: column;
    width: 60%;
    padding: 20px;
    max-height: 100%;
    overflow: auto;

    & .button-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        @include text-button(40px, 45%);
    }
}
</style>