<script setup lang="ts">
import PageContainer from '@main/PageContainer.vue';
import Top from '@top/Top.vue';
import Bottom from '@bottom/Bottom.vue';
import { useSessionStore } from '@storage';
const sessionStore = useSessionStore();
import { provide, ref } from 'vue';

const bucketStatus = ref(false);
const accountStatus = ref(false);
const toggleBucketStatus = () => {
    accountStatus.value = false;
    bucketStatus.value = true;
}
const toggleAccountStatus = () => {
    bucketStatus.value = false;
    accountStatus.value = true;
}
const openHome = () => {
    bucketStatus.value = false;
    accountStatus.value = false;
    sessionStore.clearAll();
}

provide('bucketStatus', { bucketStatus, toggleBucketStatus });

</script>

<template>
    <div class="container">
        <Top @go-home="openHome" @open-account="toggleAccountStatus" @open-bucket="toggleBucketStatus"></Top>
        <PageContainer :account-status="accountStatus" :bucket-status="bucketStatus"></PageContainer>
        <Bottom></Bottom>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
}
</style>
