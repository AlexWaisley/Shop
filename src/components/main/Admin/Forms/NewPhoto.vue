<script setup lang="ts">
import { ref } from 'vue';
import { useAdminFormStatusStore, useCreatingStore, useSessionStore } from '@storage';
import AddPhoto from './AddPhoto.vue';

const creatingStore = useCreatingStore();
const formStatusStore = useAdminFormStatusStore();

const file = ref<FormData | null>(null);

const sessionStore = useSessionStore();

const addNewPhoto = async () => {
    const item = sessionStore.pickedItem;
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
            <button type="button" @click="closeWindow">Close</button>
            <button type="submit">Add</button>
        </div>
    </form>
</template>
<style scoped lang="scss">
.form {
    display: flex;
    gap: 15px;
    flex-direction: column;
    justify-content: center;
    width: 50%;

    & .button-container {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
}
</style>