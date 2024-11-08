<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { OrderDto, OrderItemDto } from '@models';
import { useDataStore, useOrderRecordStore } from '@storage';
import OrderProductCard from '../Order/OrderProductCard.vue';
import ChangeStatusWindow from './ChangeStatusWindow.vue';
const orderStore = useOrderRecordStore();
const dataStore = useDataStore();

const props = defineProps<{
    info: OrderDto;
}>();

const isExpandOrder = ref<boolean>(false);
const ordersItemsList = ref<OrderItemDto[]>([]);

watch(isExpandOrder, async () => {
    await orderStore.loadOrderItems(props.info.id);
    const itemList = orderStore.orderItemsList?.filter(x => x.orderId === props.info.id);
    if (itemList === undefined) {
        return;
    }
    ordersItemsList.value = itemList;
})

const toggleExpand = () => {
    isExpandOrder.value = !isExpandOrder.value;
}

const addressInfo = ref<string>("");

const address = dataStore.shippingAddresses?.find(x => x.id === props.info.shippingAddress);

if (address !== undefined)
    addressInfo.value = address.street + ", " + address.house;


const statusChangeWindow = ref<boolean>(false);
const openStatusChangeWindow = () => {
    statusChangeWindow.value = true;
}
const closeStatusChangeWindow = () => {
    statusChangeWindow.value = false;
}

onMounted(async () => {
    await orderStore.loadOrderItems(props.info.id);
})

</script>
<template>
    <div class="order-container">
        <div @click="toggleExpand" class="info-container">
            <div class="id-container">
                <span class="text-large">#{{ props.info.id }}</span>
            </div>
            <div class="status-container">
                <span class="text-large">{{ props.info.status }}</span>
            </div>
            <div class="price-container">
                <span class="text-large">{{ orderStore.calcTotal(props.info.id) }}$</span>
            </div>
            <div class="address-container">
                <span class="text-large">Address info: {{ addressInfo }}</span>
            </div>
        </div>
        <div v-if="isExpandOrder" class="content">
            <OrderProductCard v-for="value in ordersItemsList" :info="value">
            </OrderProductCard>
        </div>
        <div @click="openStatusChangeWindow" class="change-status-button">
            <span class="text-large">Change status</span>
        </div>
        <Teleport v-if="statusChangeWindow" to="body">
            <ChangeStatusWindow @status-changed="closeStatusChangeWindow" :orderId="props.info.id"></ChangeStatusWindow>
        </Teleport>
    </div>
</template>
<style scoped lang="scss">
.order-container {
    background-color: skyblue;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    border-radius: 15px;

    & .info-container {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(4, 1fr);
        align-items: center;
    }

    & .content {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 7px;
    }

    & .change-status-button {
        display: flex;
        width: 100%;
        height: 80px;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        background-color: aliceblue;
        transition: all .5s ease;

        &:hover {
            background-color: rgb(189, 218, 243);
            cursor: pointer;
        }
    }
}
</style>