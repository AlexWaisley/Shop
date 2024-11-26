<script setup lang="ts">
import { Category, Product } from '@models';
import ImageBlockAdmin from './ImageBlockAdmin.vue';
import SpecsBlock from '../Item/SpecsBlock.vue';
import { useSessionStore, useCreatingStore, useProductStore, useDataStore, useDisplayInfoStore, useAdminFormStatusStore } from '@storage';
import { computed, ref, watch } from 'vue';
import WindowForm from './WindowForm.vue';

const sessionStore = useSessionStore();
const createStore = useCreatingStore();
const productStore = useProductStore();
const dataStore = useDataStore();

const fullProductInfo = ref<Product | null>(sessionStore.pickedItem);
const pickedCategory = ref<Category | null>(dataStore.pickedCategory);

const formStatusStore = useAdminFormStatusStore();
const displayInfo = useDisplayInfoStore()

const submitProductChanges = () => {
    if (fullProductInfo.value !== null && pickedCategory.value !== null)
        createStore.UpdateProduct({
            id: fullProductInfo.value.id,
            name: fullProductInfo.value.name,
            description: fullProductInfo.value.description,
            isAvailable: fullProductInfo.value.isAvailable,
            price: fullProductInfo.value.price,
            categoryId: pickedCategory.value.id
        });

    displayInfo.changeIsEditItem(false);
    console.log(displayInfo);
}

const switchAvailabilityStatus = () => {
    formStatusStore.changeAvailabilityEdit(true);
}

watch(() => productStore.productsFullInfo, () => {
    if (sessionStore.pickedItem !== null)
        fullProductInfo.value = sessionStore.pickedItem;
}, { immediate: true, deep: true })

watch(() => sessionStore.pickedItem, () => {
    if (sessionStore.pickedItem !== null)
        fullProductInfo.value = sessionStore.pickedItem;
}, { immediate: true, deep: true })

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
                        <button @click="switchAvailabilityStatus" class="text-button">
                            <span class="text-large-bold">Change availability</span>
                        </button>
                        <div class="select">
                            <div v-if="pickedCategory !== null" @click="openListSwitch" :class="['picked', isOpen]">
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
            <Teleport v-if="formStatusStore.availabilityEdit" to="body">
                <WindowForm></WindowForm>
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

                @include input-style(100%);

                & .name-container {
                    padding: 20px;
                    display: flex;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    border-radius: 15px 15px 0 0;
                    background-color: $item-info-background-color;
                }

                & .cart-container {
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    gap: 15px;
                    justify-content: space-around;
                    background-color: $item-info-background-color;
                    border-radius: 0 0 15px 15px;
                    @include text-button(60px, 90%);
                }
            }
        }

        & .item-info {
            display: flex;
            flex-direction: column;
            gap: 15px;
            justify-content: center;
            text-align: justify;
            background-color: $item-info-background-color;
            border-radius: 15px;
            padding: 20px;
            width: 100%;
            @include input-style(100%);

            & .description {
                width: 100%;
                height: 100%;
                padding: 20px;
                border-radius: 15px;
                background-color: $input-background;
            }
        }

        & .submit-btn {
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $button-color;
            transition: all .5s ease;
            border-radius: 15px;

            &:hover {
                cursor: pointer;
                background-color: rgb(116, 194, 225);
            }
        }
    }
}
</style>