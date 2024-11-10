<script setup lang="ts">
import { Category } from '@models';
import { usePreviewImagesStore, useSessionStore } from '@storage';
import { onMounted, ref, Teleport, watch } from 'vue';
import CategoryEditWindow from './CategoryEditWindow.vue';

const sessionStore = useSessionStore();
const file = ref<string | null>(null);
const imageStore = usePreviewImagesStore();
const editMenuStatus = ref<boolean>(false);

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
    editMenuStatus.value = !editMenuStatus.value;
}
</script>

<template>
    <div class="subcategory-card-container">
        <div @click="switchMenuStatusChange" class="edit-btn">
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
        <Teleport v-if="editMenuStatus" to="body">
            <CategoryEditWindow @close="switchMenuStatusChange" :category="props.info"></CategoryEditWindow>
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
    background-color: aqua;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    box-shadow: 3px 3px 3px rgb(55, 230, 230);
    transition: all .5s ease;

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

    &:hover {
        cursor: pointer;
        box-shadow: 12px 12px 12px rgb(97, 185, 220);

    }
}
</style>