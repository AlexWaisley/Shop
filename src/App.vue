<script setup lang="ts">
import PageContainer from '@main/PageContainer.vue';
import Top from '@top/Top.vue';
import Bottom from '@bottom/Bottom.vue';
import { useSessionStore } from '@storage';

const sessionStore = useSessionStore();
sessionStore.initSession();
</script>

<template>
    <div class="container">
        <Top></Top>
        <PageContainer></PageContainer>
        <Bottom></Bottom>
    </div>
</template>

<style scoped lang="scss">
.container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>
