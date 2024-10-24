<script setup lang="ts">
import { useSessionStore } from '@storage';
import { ref } from 'vue';

const sessionStore = useSessionStore();

const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"];

const mainPhotoIndex = ref<number>(1);

const nextPicture = () => {
    if (mainPhotoIndex.value >= images.length - 1) {
        mainPhotoIndex.value = 0;
        return;
    }
    mainPhotoIndex.value++;
}
const previousPicture = () => {
    if (mainPhotoIndex.value <= 0) {
        mainPhotoIndex.value = images.length - 1;
        return;
    }
    mainPhotoIndex.value--;
}


const pickMainPhoto = (index: number) => {
    mainPhotoIndex.value = index;
}


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
                <img :src="images[mainPhotoIndex]" alt="Stuff image" class="preview">
            </div>
        </div>
        <div class="all-pictures">
            <div v-for="(imageSrc, index) in images" @click="pickMainPhoto(index)" class="image-container-small">
                <img :src="imageSrc" alt="preview" class="preview">
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.image-block-container {
    display: flex;
    flex-direction: column;
    background-color: aliceblue;
    border-radius: 15px;
    box-shadow: 3px 3px 3px rgb(216, 237, 255);
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
                background-color: rgba(255, 255, 255, 0.627);
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

        & .image-container {
            max-height: 100%;
            max-width: 100%;
            overflow: hidden;
            z-index: 5;

            & .preview {
                max-width: 600px;
                max-height: 600px;
                object-fit: contain;
            }
        }
    }

    & .all-pictures {
        display: flex;
        gap: 7px;
        max-height: 120px;
        max-width: 100%;
        padding: 10px;
        overflow-x: auto;

        & .image-container-small {
            width: 80px;
            max-height: 80px;
            border-radius: 7px;
            overflow: hidden;
            border: 1px solid transparent;
            transition: all .5s ease;
            display: flex;
            justify-content: center;

            & .preview {
                max-width: 80px;
                max-height: 80px;
                object-fit: contain;
            }

            &:hover {
                border: 1px solid blue;
            }
        }

    }


}
</style>