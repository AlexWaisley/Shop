<script setup lang="ts">
import { useAdminFormStatusStore, useProductStore } from '@storage';
import { useRoute } from 'vue-router';

const formStatusStore = useAdminFormStatusStore();
const productStore = useProductStore();
const route = useRoute();

const setStatus = async (status: string) => {
    if (route.params.id === null)
        return;
    const temp = await productStore.getFullProductById(route.params.id.toString());
    if (temp === null)
        return;
    temp.isAvailable = status === "Available";
    formStatusStore.changeAvailabilityEdit(false);
}

</script>
<template>
    <div class="form">
        <button @click="setStatus('Available')">Available</button>
        <button @click="setStatus('Not available')">Not available</button>
    </div>
</template>
<style scoped lang="scss">
.form {
    display: flex;
    gap: 40px;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    padding-top: 20px;
    overflow: auto;

    & .buttons-container {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
}
</style>