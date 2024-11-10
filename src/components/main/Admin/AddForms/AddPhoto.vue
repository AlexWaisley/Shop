<script setup lang="ts">
import { ref } from 'vue';
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
    }
});
</script>
<template>
    <div class="photo-container">
        <button type="button" @click="open()">Choose image</button>
        <span v-if="files !== null">{{ files[0].name }}</span>
        <button type="button" @click="reset()">Reset</button>
    </div>
</template>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
}
</style>