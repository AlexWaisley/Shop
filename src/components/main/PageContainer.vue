<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="page-container">
        <RouterView></RouterView>
    </div>
</template>

<style scoped lang="scss">
.page-container {
    display: flex;
    flex-direction: column;
    min-height: 600px;
    flex: 1;
    width: 100%;
    gap: 7px;
    padding: 20px;
}
</style>
