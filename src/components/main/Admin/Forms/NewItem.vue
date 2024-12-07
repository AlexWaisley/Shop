<script setup lang="ts">
import { computed, ref } from 'vue';
import InputField from '@main/General/InputField.vue';
import { useAdminFormStatusStore, useCreatingStore, useDataStore } from '@storage';
import Decimal from 'decimal.js';
import toastr from 'toastr';
import { useRoute } from 'vue-router';

const creatingStore = useCreatingStore();
const dataStore = useDataStore();
const formStatusStore = useAdminFormStatusStore();

const itemName = ref<string>("");
const description = ref<string>("");
const price = ref<string>("");
const route = useRoute();

const parentCategoryId = computed<number>(() => {
    if (!route.params.name)
        return 0;
    const pickedCategory = dataStore.findCategoryByName(route.params.name.toString());
    if (pickedCategory === null) {
        return 0;
    }
    return pickedCategory.id;
});

const addNewProduct = () => {
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    const priceValid = regex.test(price.value);
    if (priceValid) {
        creatingStore.AddNewProduct({
            name: itemName.value,
            description: description.value,
            price: new Decimal(price.value),
            categoryId: parentCategoryId.value
        });
        closeWindow();
    }
    else {
        toastr.error("Price is invalid");
    }
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
    width: 50%;
    padding: 20px;
    overflow: auto;
    max-height: 100%;

    & .buttons-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        @include text-button(50px, 45%);
    }
}
</style>