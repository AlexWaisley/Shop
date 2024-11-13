<script setup lang="ts">
import { ref } from 'vue';
import { useCreatingStore } from '@storage';
import AddPhoto from './AddPhoto.vue';

const props = defineProps<{
    id: string,
}>();

const emits = defineEmits<{
    (e: 'close'): void,
    (e: 'added'): void
}>();

const creatingStore = useCreatingStore();

const file = ref<FormData | null>(null);

const addNewPhoto = async () => {
    if (file.value !== null)
        await creatingStore.AddNewProductPhoto(props.id, file.value);

    emits('added');
}

const updateFile = (fileForm: FormData) => {
    file.value = fileForm;
}

</script>
<template>
    <div class="container">
        <div class="form-container">
            <form @submit.prevent="addNewPhoto" class="form">
                <AddPhoto @file-changed="updateFile"></AddPhoto>
                <div class="button-container">
                    <button type="button" @click="$emit('close')">Close</button>
                    <button type="submit">Add</button>
                </div>
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

    }

}
</style>