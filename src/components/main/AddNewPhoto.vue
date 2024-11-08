<script setup lang="ts">
import { ref } from 'vue';
import { useCreatingStore } from '@storage';
import { useFileDialog } from '@vueuse/core';

const props = defineProps<{
    id: string,
}>();

const emits = defineEmits<{
    (e: 'close'): void
}>();

const creatingStore = useCreatingStore();
const categoryName = ref<string>("");

const { files, open, reset, onCancel, onChange } = useFileDialog()

const addNewPhoto = () => {
    const file = ref<File | null>(null);

    files.value && files.value[0] && (file.value = files.value[0]);
    if (!file.value) {
        alert('Please select a file first.');
        return;
    }
    const formData = new FormData();
    formData.append('formFile', file.value);

    creatingStore.AddNewProductPhoto(props.id, formData);

    emits('close');
}
</script>
<template>
    <div class="container">
        <div class="form-container">
            <form @submit.prevent="addNewPhoto" class="form">
                <button type="button" @click="open()">Choose file</button>
                <button type="submit">Add</button>
            </form>
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