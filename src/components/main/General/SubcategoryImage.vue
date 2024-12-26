<script setup lang="ts">
import { Category } from '@models';
import { usePreviewImagesStore } from '@storage';
import { onMounted, ref, watch } from 'vue';

const file = ref<string | null>(null);
const imageStore = usePreviewImagesStore();

const props = defineProps<{
    info: Category;
}>();

onMounted(async () => {
    await getPreview();
})

watch(() => props.info.id, async () => {
    console.log(props.info.id);
    await getPreview();
})

watch(() => imageStore.categoriesPreviews, async () => {
    await getPreview();
})

const getPreview = async () => {
    const temp = await imageStore.getCategoryImages(props.info.id);
    console.log();
    if (temp.length === 0)
        return;
    const url = await imageStore.getImageUrl(temp);
    file.value = url[0];
}
</script>
<template>
    <div class="image-container">
        <img v-if="file !== undefined && file !== null" :src="file" alt="Subcategory image" class="image">
        <img v-else src="/logo.jpg" alt="Subcategory image" class="image">
    </div>
</template>
<style scoped lang="scss">
@include center-image(200px, 200px);
</style>