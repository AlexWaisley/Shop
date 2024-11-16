<script setup lang="ts">
import { ref } from 'vue';
import { useProductStore } from '@storage';

const productStore = useProductStore();

const productName = ref<string>("");

const searchProduct = () => {
    if (productName.value !== "")
        productStore.startSearch(productName.value);
}
</script>
<template>
    <div class="searchbar-container">
        <div class="searchbar">
            <input type="text" class="text-large bar" v-model="productName" placeholder="Write product name">
        </div>
        <div @click="searchProduct" class="search">
            <img src="/search.svg" alt="search" class="icon">
        </div>
    </div>
</template>

<style scoped lang="scss">
.searchbar-container {
    display: flex;
    background-color: $input-background;
    align-items: center;
    padding: 5px;
    border-radius: 15px;
    gap: 15px;
    width: 50%;
    min-width: 200px;

    border: 2px solid transparent;
    transition: border .3s ease;

    &:focus-within {
        border: 2px solid rgb(125, 169, 193);
    }

    & .searchbar {
        width: 100%;

        & .bar {
            width: 100%;
            padding: 7px;
            border: none;
            background-color: transparent;

            &:focus {
                outline: none;
            }
        }
    }

    & .search {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 50px;
        min-height: 50px;
        padding: 5px;
        transition: all .5s ease;
        border-radius: 50%;
        aspect-ratio: 1/1;

        & .icon {
            max-width: 100%;
            max-height: 100%;
        }

        &:hover {
            background-color: rgb(202, 221, 238);
        }
    }

}
</style>