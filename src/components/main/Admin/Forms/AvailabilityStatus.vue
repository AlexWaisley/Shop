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
        <button class="text-button" @click="setStatus('Available')">
            <span class="text-default">
                Available
            </span>
        </button>
        <button class="text-button" @click="setStatus('Not available')">
            <span class="text-default">
                Not available
            </span>
        </button>
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
    @include text-button(50px, 100%);
}
</style>