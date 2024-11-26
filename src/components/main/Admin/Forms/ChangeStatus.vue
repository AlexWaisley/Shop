<script setup lang="ts">
import { useAdminFormStatusStore, useOrderRecordStore } from '@storage';

const orderStore = useOrderRecordStore();
const formStatusStore = useAdminFormStatusStore();

const setStatus = async (status: string) => {
    if (orderStore.pickedOrder === null)
        return;
    const result = await orderStore.UpdateOrderStatus(orderStore.pickedOrder.id, status);
    if (result) {
        orderStore.loadAllOrders();
    }
    formStatusStore.changeOrderStatusEdit(false);
}
</script>

<template>
    <div class="form">
        <button class="text-button" @click="setStatus('Processing')">
            <span class="text-large">Processing</span>
        </button>
        <button class="text-button" @click="setStatus('In transit')">
            <span class="text-large">In transit</span>
        </button>
        <button class="text-button" @click="setStatus('Awaiting for pickup')">
            <span class="text-large">Awaiting for pickup</span>
        </button>
        <button class="text-button" @click="setStatus('Picked up')">
            <span class="text-large">Picked up</span>
        </button>
    </div>
</template>
<style scoped lang="scss">
.form {
    display: flex;
    gap: 40px;
    flex-direction: column;
    padding: 20px;
    width: 80%;
    max-height: 100%;
    overflow: auto;
    @include text-button(40px, 100%);
}
</style>