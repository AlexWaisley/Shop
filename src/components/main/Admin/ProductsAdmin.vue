<script setup lang="ts">
import ItemCard from '@main/Products/ItemCard.vue';
import Catalog from '@main/General/Catalog.vue';
import { useAdminFormStatusStore, useDataStore, useProductStore } from '@storage';
import { ProductDto } from '@models';
import WindowForm from './WindowForm.vue';
import Query from '@main/General/Query.vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const dataStore = useDataStore();
const productStore = useProductStore();
const formStatusStore = useAdminFormStatusStore();
const route = useRoute();

const items = ref<ProductDto[] | null>(null);

watch(() => route.params, async () => {
    if (route.params.name) {
        const category = dataStore.findCategoryByName(route.params.name.toString());
        if (!category)
            return;
        items.value = await productStore.displayProductsByCategoryId(category.id);
    }
    if (route.params.part) {
        items.value = await productStore.startSearch(route.params.part.toString());
    }
}, { immediate: true });


const changeAddNewItemShowStatus = () => {
    formStatusStore.changeNewItemStatus(true);
}

const oneMore = async () => {
}

</script>
<template>
    <div class="products-container">
        <div class="side-panel">
            <Catalog></Catalog>
            <div class="filter-container"></div>
        </div>
        <div class="products">
            <div class="products-query">
                <Query />
            </div>
            <div class="products-main">
                <div @click="changeAddNewItemShowStatus" class="add-button">
                    <img src="/cross.svg" alt="add new category">
                </div>
                <ItemCard v-if="items !== null && items.length !== 0" v-for="value in items" :info="value"></ItemCard>
                <div v-if="items !== null && items.length % 20 === 0 && items.length !== 0" @click="oneMore"
                    class="loader-button">
                    <span class="text-large">Load more</span>
                </div>
            </div>
        </div>
        <Teleport v-if="formStatusStore.newItem" to="body">
            <WindowForm> </WindowForm>
        </Teleport>
    </div>
</template>
<style scoped lang="scss">
.products-container {
    display: flex;
    width: 100%;
    gap: 15px;

    & .side-panel {
        min-width: 250px;
        display: flex;
        flex-direction: column;
    }

    & .products {
        display: flex;
        flex-direction: column;
        width: 100%;

        & .products-main {
            padding: 20px;
            background-color: $sub-main-background-color;
            box-shadow: 3px 3px 3px rgb(207, 228, 246);
            border-radius: 15px;
            height: 100%;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: center;

            & .add-button {
                min-width: 250px;
                max-width: 250px;
                height: 320px;
                overflow: hidden;
                display: grid;
                gap: 7px;
                background-color: $card-background-color;

                border-radius: 15px;
                transition: all .5s ease;
                justify-content: center;
                align-items: center;

                & img {
                    transform: rotateZ(45deg);
                }

                &:hover {
                    cursor: pointer;
                    box-shadow: rgb(80, 160, 192) 0px 0px 7px 0px;
                }
            }

            & .loader-button {
                width: 100%;
                height: 80px;
                background-color: $button-color;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 15px;
                transition: all .5s ease;

                &:hover {
                    background-color: rgb(95, 157, 181);
                    cursor: pointer;
                }
            }
        }
    }
}
</style>