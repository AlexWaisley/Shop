<script setup lang="ts">
import { ref } from 'vue';
import { useDataStore } from '@storage';

const dataStorage = useDataStore();

const searchItem = ref<string>("");
</script>
<template>
    <div class="searchbar-container">
        <div class="searchbar">
            <input type="text" class="text-large bar" v-model="searchItem" placeholder="Write what you want here ...">
        </div>
        <div @click="dataStorage.startSearch(searchItem)" class="search">
            <img src="/search.svg" alt="search" class="icon">
        </div>
    </div>
</template>
<style scoped lang="scss">
.searchbar-container {
    display: flex;
    background-color: aliceblue;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 15px;
    gap: 15px;

    & .searchbar {
        width: 350px;

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
        width: 50px;
        height: 50px;
        padding: 5px;
        transition: all .5s ease;
        border-radius: 50%;

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