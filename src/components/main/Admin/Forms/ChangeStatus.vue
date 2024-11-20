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
        <button @click="setStatus('Processing')">Processing</button>
        <button @click="setStatus('In transit')">In transit</button>
        <button @click="setStatus('Awaiting for pickup')">Awaiting for pickup</button>
        <button @click="setStatus('Picked up')">Picked up</button>
    </div>
</template>
<style scoped lang="scss">
.form {
    display: flex;
    gap: 40px;
    flex-direction: column;
    justify-content: center;
    width: 50%;

    & .buttons-container {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
}
</style>