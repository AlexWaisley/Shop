<script setup lang="ts">
import { computed, ref } from 'vue';
import InputField from '@main/General/InputField.vue';
import { useCreatingStore, useSessionStore } from '@storage';
import Decimal from 'decimal.js';

const creatingStore = useCreatingStore();
const sessionStore = useSessionStore();
const emits = defineEmits<{
    (e: 'close'): void
}>();

const itemName = ref<string>("");
const description = ref<string>("");
const price = ref<string>("");

const parentCategoryId = computed<number>(() => {
    if (sessionStore.pickedCategories === null || sessionStore.pickedCategories.length === 0) {
        return 0;
    }
    return sessionStore.pickedCategories[sessionStore.pickedCategories.length - 1].id;
});

const addNewCategory = () => {
    creatingStore.AddNewProduct({
        name: itemName.value,
        description: description.value,
        price: new Decimal(price.value),
        categoryId: parentCategoryId.value
    });
    emits('close');
}
</script>
<template>
    <div class="container">
        <div class="form-container">
            <form @submit.prevent="addNewCategory" class="form">
                <InputField v-model="itemName" type="text" placeholder="Product name"></InputField>
                <InputField v-model="description" type="text" placeholder="Description"></InputField>
                <InputField v-model="price" type="text" placeholder="Price"></InputField>
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
    z-index: 5;

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