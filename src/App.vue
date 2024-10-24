<script setup lang="ts">
import PageContainer from '@main/PageContainer.vue';
import Top from '@top/Top.vue';
import Bottom from '@bottom/Bottom.vue';
import { useSessionStore } from '@storage';
const sessionStore = useSessionStore();
import { provide, ref } from 'vue';

const bucketStatus = ref(false);
const toggleBucketStatus = () => {
    bucketStatus.value = true;
}
const openHome = () => {
    bucketStatus.value = false;
    sessionStore.clearAll();
}

provide('bucketStatus', { bucketStatus, toggleBucketStatus });

</script>

<template>
    <div class="container">
        <Top @go-home="openHome" @open-bucket="toggleBucketStatus"></Top>
        <PageContainer :bucket-status="bucketStatus"></PageContainer>
        <Bottom></Bottom>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
}
</style>
