<script setup lang="ts">
import { Category, Product } from '@models';
import ImageBlockAdmin from './ImageBlockAdmin.vue';
import SpecsBlock from '../Item/SpecsBlock.vue';
import { useSessionStore, useCartStore, useCreatingStore, useProductStore, useDataStore, useDisplayInfoStore } from '@storage';
import { computed, onMounted, ref, watch } from 'vue';
import AvailabilityStatusWindow from './AvailabilityStatusWindow.vue';
const sessionStore = useSessionStore();
const createStore = useCreatingStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const dataStore = useDataStore();
const fullProductInfo = ref<Product | null>(null);

const id = sessionStore.pickedItem?.id;
const availabilityStatus = ref<boolean>(false);
const temp = ref<Product | null>(null);
const displayInfo = useDisplayInfoStore()

onMounted(async () => {
    if (id !== undefined) {
        temp.value = await productStore.getFullProductById(id);
        fullProductInfo.value = JSON.parse(JSON.stringify(temp.value));
    }
})

const submitProductChanges = () => {
    if (fullProductInfo.value !== null)
        createStore.UpdateProduct({
            id: fullProductInfo.value.id,
            name: fullProductInfo.value.name,
            description: fullProductInfo.value.description,
            isAvailable: fullProductInfo.value.isAvailable,
            price: fullProductInfo.value.price,
            categoryId: pickedCategory.value.id
        });

    displayInfo.changeIsEditItem(false);
}

const switchAvailabilityStatus = () => {
    availabilityStatus.value = !availabilityStatus.value;
}

const changeStatus = (status: string) => {
    if (fullProductInfo.value === null) {
        return;
    }
    if (status === "Available") {
        fullProductInfo.value.isAvailable = true;
    }
    if (status === "Not available") {
        fullProductInfo.value.isAvailable = false;
    }
    switchAvailabilityStatus();
}

watch(() => productStore.productsFullInfo, async () => {
    if (id !== undefined) {
        temp.value = await productStore.getFullProductById(id);
        fullProductInfo.value = JSON.parse(JSON.stringify(temp.value));
    }
}, { immediate: true, deep: true })


const pickedCategory = ref<Category>(sessionStore.pickedCategories![sessionStore.pickedCategories!.length - 1]);
const isOpen = computed<string>((): string => {
    return openList.value ? "opened" : "";
});
const openList = ref<boolean>(false);
const openListSwitch = () => {
    openList.value = !openList.value;
}
const changePicked = (category: Category) => {
    pickedCategory.value = category;
    openListSwitch();
}
</script>

<template>
    <div v-if="fullProductInfo !== null" class="primary-container">
        <div class="item-container">
            <div class="item">
                <div class="image-container">
                    <ImageBlockAdmin :full-info="fullProductInfo"></ImageBlockAdmin>
                </div>
                <div class="fast-info">
                    <div class="name-container">
                        <input class="input" type="text" v-model="fullProductInfo.name" />
                    </div>
                    <div class="cart-container">
                        <div class="price-container">
                            <input class="input" type="text" v-model="fullProductInfo.price" />
                        </div>
                        <button @click="switchAvailabilityStatus" class="buy-button">
                            <span class="text-large-bold">Change availability</span>
                        </button>
                        <div class="select">
                            <div @click="openListSwitch" :class="['picked', isOpen]">
                                <span class="text-default">{{ pickedCategory.name }}</span>
                            </div>
                            <div :class="['list', isOpen]">
                                <div @click="changePicked(value)" class="option"
                                    v-for="(value) in dataStore.categories">
                                    <span class="text-default">{{ value.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-info">
                <div class="description">
                    <input class="input" type="text" v-model="fullProductInfo.description">
                </div>
                <div class="specs">
                    <SpecsBlock></SpecsBlock>
                </div>
            </div>
            <div @click="submitProductChanges" class="submit-btn">
                <span class="text-large">Submit changes</span>
            </div>
            <Teleport v-if="availabilityStatus" to="body">
                <AvailabilityStatusWindow @status-changed="changeStatus"></AvailabilityStatusWindow>
            </Teleport>
        </div>
    </div>
</template>
<style scoped lang="scss">
.primary-container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;

    & .item-container {
        height: 100%;
        max-width: 1700px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: max(80%, 1100px);

        & .item {
            border-radius: 15px;
            justify-content: center;
            gap: 15px;
            max-width: 100%;

            @media screen and (max-width: 1100px) {
                & {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    flex-direction: column;

                    & .fast-info {
                        width: 750px;
                    }
                }
            }

            @media screen and (min-width: 1100px) {
                & {
                    display: grid;
                    grid-template-columns: 750px 1fr;
                }
            }

            & .image-container {
                max-width: 100%;
            }

            & .fast-info {
                border-radius: 15px;
                text-overflow: ellipsis;
                display: flex;
                flex-direction: column;
                gap: 15px;

                & .name-container {
                    padding: 20px;
                    display: flex;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    border-radius: 15px 15px 0 0;
                    background-color: aliceblue;
                    box-shadow: 3px 3px 3px rgb(216, 237, 255);
                }

                & .cart-container {
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    gap: 15px;
                    justify-content: space-around;
                    background-color: aliceblue;
                    border-radius: 0 0 15px 15px;
                    box-shadow: 3px 3px 3px rgb(216, 237, 255);

                    & .buy-button {
                        background-color: skyblue;
                        user-select: none;
                        padding: 10px;
                        border-radius: 15px;
                        transition: all .5s ease;

                        &:hover {
                            cursor: pointer;
                            background-color: rgb(94, 175, 208);
                        }
                    }
                }
            }
        }

        & .item-info {
            display: flex;
            flex-direction: column;
            gap: 15px;
            justify-content: center;
            text-align: justify;
            background-color: aliceblue;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 3px 3px 3px rgb(216, 237, 255);
            width: 100%;

            & .description {
                width: 100%;
                height: 100%;
                padding: 20px;
                border-radius: 15px;
                background-color: rgb(227, 242, 255);
                box-shadow: 3px 3px 3px rgb(216, 237, 255);
            }
        }

        & .submit-btn {
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: skyblue;
            transition: all .5s ease;
            border-radius: 15px;
            box-shadow: 3px 3px 3px rgb(98, 169, 198);

            &:hover {
                cursor: pointer;
                background-color: rgb(116, 194, 225);
            }
        }
    }
}
</style>