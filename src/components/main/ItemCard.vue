<script setup lang="ts">
import { ProductDto } from '@models';
import { useSessionStore, useCartStore, useDataStore } from '@storage';
import { onMounted, ref, watch } from 'vue';

const sessionStore = useSessionStore();
const cartStore = useCartStore();
const dataStore = useDataStore();
const file = ref<string | null>(null);

const props = defineProps<{
    info: ProductDto;
}>();

const pickItem = async () => {
    await sessionStore.pickItem(props.info.id);
}

onMounted(async () => {
    if (dataStore.productsPreviews === null) {
        await dataStore.LoadProductsPreviews(props.info.id);
    }
    if (dataStore.productsPreviews !== null && dataStore.productsPreviews.length < 1) {
        await dataStore.LoadProductsPreviews(props.info.id);
    }
    if (dataStore.productsPreviews !== null) {
        const preview = dataStore.productsPreviews.filter(x => x.productId === props.info.id)[0];
        if (preview === undefined)
            return;
        const previewUrl = await dataStore.loadPreview(preview.imageId);
        if (previewUrl !== null)
            file.value = previewUrl;
    }
})

watch(props.info, async () => {
    if (dataStore.productsPreviews === null) {
        await dataStore.LoadProductsPreviews(props.info.id);
    }
    if (dataStore.productsPreviews !== null && dataStore.productsPreviews.length < 1) {
        await dataStore.LoadProductsPreviews(props.info.id);
    }
    if (dataStore.productsPreviews !== null) {
        const preview = dataStore.productsPreviews.filter(x => x.productId === props.info.id)[0];
        if (preview === undefined)
            return;
        const previewUrl = await dataStore.loadPreview(preview.imageId);
        if (previewUrl !== null)
            file.value = previewUrl;
    }
})
</script>
<template>
    <div class="item-card-container">
        <div @click="pickItem()" class="image-container">
            <img v-if="file !== null" :src="file" alt="Item image" class="item-image">
            <img v-else src="/logo.jpg" alt="not loaded">
        </div>
        <div class="info-container">
            <div @click="pickItem()" class="info">
                <div class="name">
                    <span class="text-large">
                        {{ props.info.name }}
                    </span>
                </div>
            </div>
            <div class="info">
                <div class="cost">
                    <span class="text-large-bold">{{ props.info.price.toFixed(2) }}$</span>
                </div>
                <button :disabled="cartStore.isItemInCart(props.info.id)" @click="cartStore.addToCart(props.info.id, 1)"
                    class="buy-button">
                    <span class="text-large">Buy</span>
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.item-card-container {
    min-width: 250px;
    max-width: 250px;
    height: 320px;
    overflow: hidden;
    display: grid;
    grid-template-rows: 200px 1fr;
    gap: 7px;
    background-color: aqua;


    border-radius: 15px;
    box-shadow: 3px 3px 3px rgb(55, 230, 230);
    transition: all .5s ease;

    & .image-container {
        max-height: 200px;
        max-width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        padding: 10px;

        & .item-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }

    & .info-container {
        display: grid;
        grid-template-rows: 50px 1fr;
        gap: 5px;
        width: 100%;

        & .info {
            display: flex;
            width: 100%;
            justify-content: space-around;
            align-items: center;

            & .name {
                display: flex;
                text-align: center;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                line-height: 24px;
                max-height: 54px;
            }

            & .buy-button {
                background-color: skyblue;
                padding: 7px;
                border-radius: 15px;
                transition: all .5s ease;
                z-index: 5;
                user-select: none;

                &:hover {
                    cursor: pointer;
                    background-color: rgb(94, 175, 208);
                }
            }

        }
    }

    &:hover {
        cursor: pointer;
        box-shadow: 12px 12px 12px rgb(97, 185, 220);

    }
}
</style>