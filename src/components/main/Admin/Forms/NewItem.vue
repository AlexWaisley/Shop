<script setup lang="ts">
import { computed, ref } from 'vue';
import InputField from '@main/General/InputField.vue';
import { useAdminFormStatusStore, useCreatingStore, useSessionStore } from '@storage';
import Decimal from 'decimal.js';

const creatingStore = useCreatingStore();
const sessionStore = useSessionStore();
const formStatusStore = useAdminFormStatusStore();

const itemName = ref<string>("");
const description = ref<string>("");
const price = ref<string>("");

const parentCategoryId = computed<number>(() => {
    if (sessionStore.pickedCategories === null || sessionStore.pickedCategories.length === 0) {
        return 0;
    }
    return sessionStore.pickedCategories[sessionStore.pickedCategories.length - 1].id;
});

const addNewProduct = () => {
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    const priceValid = regex.test(price.value);
    if (priceValid)
        creatingStore.AddNewProduct({
            name: itemName.value,
            description: description.value,
            price: new Decimal(price.value),
            categoryId: parentCategoryId.value
        });
    closeWindow();
}

const closeWindow = () => {
    formStatusStore.changeNewItemStatus(false);
}
</script>
<template>
    <form @submit.prevent="addNewProduct" class="form">
        <InputField v-model="itemName" type="text" placeholder="Product name"></InputField>
        <InputField v-model="description" type="text" placeholder="Description"></InputField>
        <InputField v-model="price" type="text" placeholder="Price"></InputField>
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