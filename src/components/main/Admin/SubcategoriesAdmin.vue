<script setup lang="ts">
import SubcategoryCard from './SubcategoryCardAdmin.vue';
import { useDataStore, useSessionStore, useProductStore, useAdminFormStatusStore } from '@storage';
import { computed, ref, watch, } from 'vue';
import WindowForm from './WindowForm.vue';
import { useRoute } from 'vue-router';
import { Category } from '@models';

const sessionStore = useSessionStore();
const dataStore = useDataStore();
const productStore = useProductStore();
const formStatusStore = useAdminFormStatusStore();

const parentCategoryId = computed<number>(() => {
    if (sessionStore.pickedCategories === null || sessionStore.pickedCategories.length === 0) {
        return 0;
    }
    return sessionStore.pickedCategories[sessionStore.pickedCategories.length - 1].id;
});

const openProductsPage = async () => {
    await productStore.displayProductsByCategoryId(parentCategoryId.value);
}

const changeAddNewCategoryShowStatus = () => {
    formStatusStore.changeNewCategoryStatus(true);
}

const route = useRoute();
const displayedCategories = ref<Category[] | null>(null);
const load = () => {
    console.log(route.params.name);
    if (route.params.name) {
        let parentCategory = dataStore.categories?.find(x => x.name === route.params.name);
        if (parentCategory !== undefined) {
            const res = dataStore.categories?.filter(x => x.parentCategory === parentCategory!.id);
            if (res) {
                displayedCategories.value = res;
                return;
            }
        }
        parentCategory = dataStore.rootCategories?.find(x => x.name === route.params.name);
        if (parentCategory !== undefined) {
            const res = dataStore.categories?.filter(x => x.parentCategory === parentCategory!.id);
            if (res) {
                displayedCategories.value = res;
                return;
            }
        }
    }
    displayedCategories.value = [];
};

watch(() => route.params.name, () => {
    load();
}, { immediate: true });
</script>
<template>
    <div class="subcategories-container">
        <div @click="changeAddNewCategoryShowStatus" class="button add">
            <img src="/cross.svg" alt="add new subcategory">
        </div>
        <SubcategoryCard v-if="displayedCategories !== null && displayedCategories.length !== 0"
            v-for="value in displayedCategories" :info="value" />
        <RouterLink :to="'/' + route.params.name + '/admin/products'">
            <div v-if="!displayedCategories || displayedCategories.length < 1" @click="openProductsPage"
                class="button continue">
                <img src="/switch.svg" alt="Go to products">
            </div>
        </RouterLink>
        <Teleport v-if="formStatusStore.newCategory" to="body">
            <WindowForm> </WindowForm>
        </Teleport>
    </div>
</template>

<style scoped lang="scss">
.subcategories-container {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    gap: 15px;
    padding: 20px;
    justify-content: center;
    background-color: $sub-main-background-color;
    border-radius: 5px;

    & .button {
        min-width: 250px;
        height: 250px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 7px;
        background-color: $card-background-color;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        transition: all .5s ease;

        &.continue>img {
            transform: rotateZ(180deg);
        }

        &.add>img {
            transform: rotateZ(45deg);
        }

        &:hover {
            cursor: pointer;
            box-shadow: rgb(80, 160, 192) 0px 0px 7px 0px;
        }
    }
}
</style>