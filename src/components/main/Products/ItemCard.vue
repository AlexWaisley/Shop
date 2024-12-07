<script setup lang="ts">
import { ProductDto } from '@models';
import { useCartStore, usePreviewImagesStore, useSessionStore } from '@storage';
import { onMounted, ref, watch } from 'vue';

const cartStore = useCartStore();
const sessionStore = useSessionStore();
const imageStore = usePreviewImagesStore();
const file = ref<string | null>(null);


const props = defineProps<{
    info: ProductDto;
}>();

const pickItem = async () => {
}

onMounted(async () => {
    await previewLoader();
})

watch(() => props.info, async () => {
    await previewLoader();
})

const previewLoader = async () => {
    const temp = await imageStore.getProductImages(props.info.id);
    if (temp.length === 0)
        return;
    const url = await imageStore.getImageUrl(temp);
    file.value = url[0];
}

const addItemToCart = async () => {
    sessionStore.addToHistory(props.info.id);
    await cartStore.addToCart(props.info.id, 1);
}

</script>
<template>
    <div class="item-card-container">
        <RouterLink :to="'/item/' + props.info.id">
            <div @click="pickItem()" class="image-container">
                <img v-if="file !== null && file !== undefined" :src="file" alt="Item image" class="image">
                <img v-else src="/logo.jpg" class="image" alt="not loaded">
            </div>
        </RouterLink>
        <div class="info-container">
            <RouterLink :to="'/item/' + props.info.id">
                <div @click="pickItem()" class="info">
                    <div class="name">
                        <span class="text-large">
                            {{ props.info.name }}
                        </span>
                    </div>
                </div>
            </RouterLink>
            <div class="info">
                <div class="cost">
                    <span class="text-large-bold">{{ props.info.price }}$</span>
                </div>
                <button :disabled="(!props.info.isAvailable || cartStore.isItemInCart(props.info.id))"
                    @click="addItemToCart" class="button">
                    <img src="/cart.svg" width="30px" alt="Buy">
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
    padding: 10px;
    background-color: $card-background-color;

    border-radius: 15px;
    transition: all .5s ease;

    @include center-image(100%, 100%);

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

            @include icon-button(70px, 40px);
        }
    }

    &:hover {
        cursor: pointer;
        box-shadow: rgb(80, 160, 192) 0px 0px 7px 0px;
    }
}
</style>