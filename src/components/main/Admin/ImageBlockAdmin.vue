<script setup lang="ts">
import { usePreviewImagesStore } from '@storage';
import { onMounted, ref } from 'vue';
import AddNewPhoto from '@main/Admin/AddForms/NewPhoto.vue';
import { Product, ProductImage } from '@models';


const props = defineProps<{
    fullInfo: Product
}>();

const imageStore = usePreviewImagesStore();


const img = ref<ProductImage[] | null>(null);
const files = ref<string[] | null>(null);

const mainPhotoIndex = ref<number>(0);

const isAddNewPhoto = ref<boolean>(false);

const updatePreviews = async () => {
    img.value = await imageStore.getProductImages(props.fullInfo.id);
    files.value = await imageStore.getImageUrl(img.value);
    isAddNewPhoto.value = false;
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

const changeAddNewPhotoStatus = () => {
    isAddNewPhoto.value = !isAddNewPhoto.value;
}

onMounted(async () => {
    await imageStore.LoadProductsPreviews(props.fullInfo.id);
    await updatePreviews();
});

const previewAdded = async () => {
    await updatePreviews();
    if (files.value === null)
        return;
    mainPhotoIndex.value = files.value.length - 1;
}

const deleteCurrImage = async () => {
    if (files.value === null || imageStore.previews === null)
        return;
    const image = files.value[mainPhotoIndex.value];
    const imageId = imageStore.previews.find(x => x.url === image);
    if (imageId === undefined)
        return
    await imageStore.deleteProductImage(imageId.id);
    previousPicture();
    await updatePreviews();
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
                <img v-if="files !== null" :src="files[mainPhotoIndex]" type="file" alt="Stuff image" class="preview">
            </div>
            <div @click="deleteCurrImage" class="delete-button">
                <img src="/cross.svg" alt="Delete image" class="add_preview">
            </div>
        </div>
        <div class="all-pictures">
            <div @click="changeAddNewPhotoStatus" class="add-container">
                <img src="/cross.svg" alt="Add image" class="add_preview">
            </div>
            <div v-for="(imageSrc, index) in files" @click="pickMainPhoto(index)" class="image-container-small">
                <img :src="imageSrc" alt="preview" class="preview">
            </div>
        </div>
        <Teleport v-if="isAddNewPhoto" to="body">
            <AddNewPhoto @added="previewAdded" :id="fullInfo.id" @close="changeAddNewPhotoStatus"></AddNewPhoto>
        </Teleport>
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

        & .delete-button {
            position: absolute;
            z-index: 20;
        }

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

        & .add-container {
            & .add_preview {
                width: 80px;
                max-height: 80px;
                border-radius: 7px;
                overflow: hidden;
                border: 1px solid transparent;
                transition: all .5s ease;
                display: flex;
                justify-content: center;

                &:hover {
                    border: 1px solid blue;
                }
            }
        }

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