<script setup lang="ts">
import PageContainer from '@main/PageContainer.vue';
import Top from '@top/Top.vue';
import Bottom from '@bottom/Bottom.vue';
import { useSessionStore } from '@storage';
import { ref, watch } from 'vue';


const sessionStore = useSessionStore();
sessionStore.initSession();

const cartStatus = ref(false);
const accountStatus = ref(false);

const toggleBucketStatus = () => {
    accountStatus.value = false;
    cartStatus.value = true;
    sessionStore.clearAll();
}
const toggleAccountStatus = () => {
    cartStatus.value = false;
    accountStatus.value = true;
    sessionStore.clearAll();
}
const openHome = () => {
    cartStatus.value = false;
    accountStatus.value = false;
    sessionStore.clearAll();
}

watch(() => sessionStore.pickedItem, (newVal) => {
    if (newVal !== null) {
        cartStatus.value = false;
        accountStatus.value = false;
    }
})
</script>

<template>
    <div class="container">
        <Top @go-home="openHome" @open-account="toggleAccountStatus" @open-bucket="toggleBucketStatus"></Top>
        <PageContainer :account-status="accountStatus" :cart-status="cartStatus"></PageContainer>
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
