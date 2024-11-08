<script setup lang="ts">
import { useOrderRecordStore } from '@storage';

const props = defineProps<{
    orderId: string
}>();
const emits = defineEmits<{
    (e: 'statusChanged'): void
}>();

const orderStore = useOrderRecordStore();
const setStatus = async (status: string) => {
    const result = await orderStore.UpdateOrderStatus(props.orderId, status);
    if (result) {
        orderStore.loadAllOrders();
        emits('statusChanged');
    }
}
</script>
<template>
    <div class="container">
        <div class="form-container">
            <div class="form">
                <button @click="setStatus('Processing')">Processing</button>
                <button @click="setStatus('In transit')">In transit</button>
                <button @click="setStatus('Awaiting for pickup')">Awaiting for pickup</button>
                <button @click="setStatus('Picked up')">Picked up</button>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    background-color: rgba(0, 0, 0, 0.105);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 7;

    & .form-container {
        width: 50%;
        height: 60%;
        min-height: 200px;
        background-color: rgb(187, 224, 238);
        border-radius: 15px;
        padding: 7px;
        display: flex;
        justify-content: center;
        align-items: center;

        & .form {
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

    }

}
</style>