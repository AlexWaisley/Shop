<script setup lang="ts">
import { usePreviewImagesStore } from '@storage';
import { onMounted, ref } from 'vue';
import { Product, ProductImage } from '@models';

const props = defineProps<{
    fullInfo: Product
}>();

const imageStore = usePreviewImagesStore();

const img = ref<ProductImage[] | null>(null);
const files = ref<string[] | null>(null);

const mainPhotoIndex = ref<number>(0);

const updatePreviews = async () => {
    img.value = await imageStore.getProductImages(props.fullInfo.id);
    files.value = await imageStore.getImageUrl(img.value);
}

const nextPicture = () => {
    if (files.value === null)
        return;
    if (mainPhotoIndex.value >= files.value.length - 1) {
        mainPhotoIndex.value = 0;
        return;
    }
    mainPhotoIndex.value++;
}

const previousPicture = () => {
    if (files.value === null)
        return;
    if (mainPhotoIndex.value <= 0) {
        mainPhotoIndex.value = files.value.length - 1;
        return;
    }
    mainPhotoIndex.value--;
}

const pickMainPhoto = (index: number) => {
    mainPhotoIndex.value = index;
}

onMounted(async () => {
    await imageStore.LoadProductsPreviews(props.fullInfo.id);
    await updatePreviews();
});

</script>
<template>
    <div class="image-block-container">
        <div class="main-section">
            <div class="switches">
                <div @click="previousPicture" class="switch">
                    <img src="/switch.svg" alt="Previous photo" class="switch-image">
                </div>
                <div @click="nextPicture" class="switch">
                    <img src="/switch.svg" alt="Next photo" class="switch-image">
                </div>
            </div>
            <div class="image-container">
                <img v-if="files !== null" :src="files[mainPhotoIndex]" type="file" alt="Stuff image" class="image">
            </div>
        </div>
        <div class="all-pictures">
            <div v-for="(imageSrc, index) in files" @click="pickMainPhoto(index)" class="image-container">
                <img :src="imageSrc" alt="preview" class="image">
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.image-block-container {
    display: flex;
    flex-direction: column;
    background-color: $item-info-background-color;
    border-radius: 15px;
    width: 750px;
    padding: 20px;
    align-items: center;

    & .main-section {
        display: flex;
        width: 600px;
        height: 600px;
        position: relative;
        align-items: center;
        justify-content: center;

        & .switches {
            position: absolute;
            width: 100%;
            height: 600px;
            display: flex;
            justify-content: space-between;
            user-select: none;

            & .switch {
                display: flex;
                align-items: center;
                margin: 0 -50px;
                justify-content: center;
                width: 50px;
                opacity: .2;
                transition: all .5s ease;

                &:last-child {
                    transform: rotate(180deg);
                }

                &:hover {
                    opacity: .8;
                    cursor: pointer;
                }
            }
        }

        @include center-image(600px, 600px);
    }

    & .all-pictures {
        display: flex;
        gap: 7px;
        max-height: 120px;
        max-width: 100%;
        padding: 10px;
        overflow-x: auto;

        @include center-image(80px, 80px);

        & .image-container {
            border-radius: 7px;
            border: 1px solid transparent;
            transition: all .5s ease;
            min-width: 80px;

            &:hover {
                border: 1px solid blue;
            }
        }
    }
}
</style>