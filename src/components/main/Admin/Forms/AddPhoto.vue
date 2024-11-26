<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFileDialog } from '@vueuse/core';

const emits = defineEmits<{
    (e: 'fileChanged', formFile: FormData): void
}>();
const { files, open, reset, onChange } = useFileDialog()

onChange((files) => {
    if (files !== null) {
        const file = ref<File | null>(null);

        files && files[0] && (file.value = files[0]);
        if (!file.value) {
            alert('Please select a file first.');
            return;
        }
        const formData = new FormData();
        formData.append('formFile', file.value);
        emits('fileChanged', formData);
        imageUrl.value = URL.createObjectURL(file.value);
    }
});


const imageUrl = ref<string | null>(null);


watch(() => files.value, (newFiles) => {
    if (!newFiles) {
        imageUrl.value = null;
    }
}, { immediate: true });
</script>
<template>
    <div class="photo-container">
        <div class="buttons-container">
            <button class="text-button" type="button" @click="open()">
                <span class="text-large">Choose image</span>
            </button>
            <button class="text-button" type="button" @click="reset()">
                <span class="text-large">Reset</span>
            </button>
        </div>
        <div v-if="imageUrl !== null && files !== null" class="preview-info">
            <img v-if="imageUrl !== null" :src="imageUrl" alt="pic" class="preview">
            <span v-if="files !== null">{{ files[0].name }}</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.photo-container {
    display: flex;
    gap: 15px;


    & .buttons-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
        justify-content: center;
        align-items: center;
        @include text-button(40px, 100%);
    }


    & .preview-info {
        display: flex;
        flex-direction: column;

        & .preview {
            max-height: 200px;
            max-width: 200px;
            object-fit: contain;
        }
    }

}
</style>