<script setup lang="ts">
import { Category } from '@models';
import { usePreviewImagesStore, useSessionStore } from '@storage';
import { onMounted, ref, watch } from 'vue';

const sessionStore = useSessionStore();
const file = ref<string | null>(null);
const imageStore = usePreviewImagesStore();

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
</script>

<template>
    <div @click="sessionStore.pickCategory(props.info)" class="subcategory-card-container">
        <div class="image-container">
            <img v-if="file !== undefined && file !== null" :src="file" alt="Subcategory image"
                class="subcategory-image">
            <img v-else src="/logo.jpg" alt="Subcategory image" class="subcategory-image">
        </div>
        <div class="info-container">
            <div class="info">
                <div class="name">
                    <span class="text-large-bold">
                        {{ props.info.name }}
                    </span>
                </div>
            </div>
        </div>
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
    justify-content: center;
    align-items: center;
    border-radius: 15px;
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