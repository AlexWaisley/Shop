<script setup lang="ts">
import { ref } from 'vue';
import InputField from './InputField.vue';
import { useCreatingStore } from '@storage';
const props = defineProps<{
    parentCategoryId: number
}>();
const emits = defineEmits<{
    (e: 'close'): void
}>();
const creatingStore = useCreatingStore();
const categoryName = ref<string>("");
const imageUrl = ref<string>("");

const addNewCategory = () => {
    creatingStore.AddNewCategory({ name: categoryName.value, imageUrl: imageUrl.value, parentCategoryId: props.parentCategoryId });
    emits('close');
}
</script>
<template>
    <div class="container">
        <div class="form-container">
            <form @submit.prevent="addNewCategory" class="form">
                <InputField v-model="categoryName" type="text" placeholder="Category name"></InputField>
                <InputField v-model="imageUrl" type="text" placeholder="Category image url"></InputField>
                <div class="buttons-container">
                    <button type="reset" @click="$emit('close')">Cancel</button>
                    <button type="submit">Submit</button>
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