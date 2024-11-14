<script setup lang="ts">
import { Category } from '@models';
import { useAdminFormStatusStore, useDataStore, usePreviewImagesStore, useSessionStore } from '@storage';
import { onMounted, ref, Teleport, watch } from 'vue';
import WindowForm from './WindowForm.vue';

const sessionStore = useSessionStore();
const file = ref<string | null>(null);
const imageStore = usePreviewImagesStore();
const formStatusStore = useAdminFormStatusStore();
const dataStore = useDataStore();

const props = defineProps<{
    info: Category;
}>();

onMounted(async () => {
    const temp = await imageStore.getCategoryImages(props.info.id);
    const url = await imageStore.getImageUrl(temp);
    file.value = url[0];
})

watch(() => props.info, async () => {
    const temp = await imageStore.getCategoryImages(props.info.id);
    const url = await imageStore.getImageUrl(temp);
    file.value = url[0];
})

watch(() => imageStore.categoriesPreviews, async () => {
    const temp = await imageStore.getCategoryImages(props.info.id);
    const url = await imageStore.getImageUrl(temp);
    file.value = url[0];
})

const switchMenuStatusChange = () => {
    dataStore.changePickedCategory(props.info);
    formStatusStore.changeCategoryEdit(true);
}
</script>

<template>
    <div class="subcategory-card-container">
        <div @click="switchMenuStatusChange" class="edit-button">
            <img src="/dots.svg" alt="Edit">
        </div>
        <div @click="sessionStore.pickCategory(props.info)" class="image-container">
            <img v-if="file !== undefined && file !== null" :src="file" alt="Subcategory image"
                class="subcategory-image">
            <img v-else src="/logo.jpg" alt="Subcategory image" class="subcategory-image">
        </div>
        <div @click="sessionStore.pickCategory(props.info)" class="info-container">
            <div class="info">
                <div class="name">
                    <span class="text-large-bold">
                        {{ props.info.name }}
                    </span>
                </div>
            </div>
        </div>
        <Teleport v-if="formStatusStore.categoryEdit" to="body">
            <WindowForm></WindowForm>
        </Teleport>
    </div>
</template>
<style scoped lang="scss">
.subcategory-card-container {
    min-width: 250px;
    height: 250px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 7px;
    background-color: $card-background-color;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    transition: all .5s ease;
    position: relative;

    & .image-container {
        max-height: 200px;
        max-width: 200px;
        overflow: hidden;

        & .subcategory-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }

    & .info-container {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;

        & .info {
            display: flex;
            width: 100%;
            justify-content: space-around;
        }
    }

    & .edit-button {
        position: absolute;
        top: 10px;
        right: 5px;
        z-index: 5;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3px;
        transition: background-color .3s ease;

        &:hover {
            background-color: rgb(100, 171, 199);
        }
    }

    &:hover {
        cursor: pointer;
        box-shadow: 12px 12px 12px rgb(97, 185, 220);

    }
}
</style>