<script setup lang="ts">
import { ref, watch } from 'vue';
import { useProductStore } from '@storage';
import { useRoute } from 'vue-router';

const productStore = useProductStore();

const route = useRoute();
const productName = ref<string>("");
if (route.params.part)
    productName.value = route.params.part.toString();

const searchProduct = () => {
    if (productName.value !== "")
        productStore.startSearch(productName.value);
}
watch(() => route.params.part, () => {
    if (route.params.part)
        productName.value = route.params.part.toString();
    else
        productName.value = "";
});
</script>
<template>
    <div class="searchbar-container">
        <div class="searchbar">
            <input type="text" class="text-large bar" v-model="productName" placeholder="Write product name">
        </div>
        <Transition>
            <RouterLink v-if="productName !== ''" :to="'/search/products/part=' + productName">
                <div @click="searchProduct" class="search">
                    <img src="/search.svg" alt="search" class="icon">
                </div>
            </RouterLink>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
    transition: transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    transform: translateX(100px);
}

.searchbar-container {
    display: flex;
    background-color: $input-background;
    align-items: center;
    padding: 5px;
    border-radius: 15px;
    gap: 15px;
    width: 50%;
    min-width: 200px;
    overflow: hidden;

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