<script setup lang="ts">
import ItemCard from './ItemCard.vue';
import Catalog from './Catalog.vue';
import { useSessionStore } from '@storage';
import { Item } from '@models';
import { ref, watch } from 'vue';
import AddNewItem from './AddNewItem.vue';

const sessionStore = useSessionStore();

const items = ref<Item[] | null>(sessionStore.displayedProducts);

watch(() => sessionStore.displayedProducts, (newVal) => {
    items.value = newVal;
}, { immediate: true });


const addNewItem = ref<boolean>(false);

const changeAddNewItemShowStatus = () => {
    addNewItem.value = !addNewItem.value;
}
</script>
<template>
    <div class="products-container">
        <div class="side-panel">
            <Catalog></Catalog>
            <div class="filter-container"></div>
        </div>
        <div class="products">
            <div v-if="sessionStore.currUser?.isAdmin" @click="changeAddNewItemShowStatus" class="add-button">
                <img src="/cross.svg" alt="add new category">
            </div>
            <ItemCard v-if="items !== null && items.length !== 0" v-for="value in items" :info="value"></ItemCard>
            <span v-else class="text-large">Sorry, there doesn't seem to be anything like that</span>
        </div>
        <Teleport v-if="addNewItem" to="body">
            <AddNewItem @close="changeAddNewItemShowStatus">
            </AddNewItem>
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
        padding: 20px;
        background-color: aliceblue;
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
            background-color: aqua;

            border-radius: 15px;
            box-shadow: 3px 3px 3px rgb(55, 230, 230);
            transition: all .5s ease;
            justify-content: center;
            align-items: center;

            & img {
                transform: rotateZ(45deg);
            }

            &:hover {
                cursor: pointer;
                box-shadow: 12px 12px 12px rgb(97, 185, 220);

            }
        }
    }
}
</style>