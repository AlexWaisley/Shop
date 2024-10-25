<script setup lang="ts">
import PageContainer from '@main/PageContainer.vue';
import Top from '@top/Top.vue';
import Bottom from '@bottom/Bottom.vue';
import { useSessionStore } from '@storage';
import { provide, ref, watch } from 'vue';
import 'toastr/build/toastr.min.css';


const sessionStore = useSessionStore();

const bucketStatus = ref(false);
const accountStatus = ref(false);
const toggleBucketStatus = () => {
    accountStatus.value = false;
    bucketStatus.value = true;
    sessionStore.clearAll();
}
const toggleAccountStatus = () => {
    bucketStatus.value = false;
    accountStatus.value = true;
    sessionStore.clearAll();
}
const openHome = () => {
    bucketStatus.value = false;
    accountStatus.value = false;
    sessionStore.clearAll();
}

watch(() => sessionStore.pickedItem, (newVal) => {
    if (newVal !== null) {
        bucketStatus.value = false;
        accountStatus.value = false;
    }
})

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
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>
