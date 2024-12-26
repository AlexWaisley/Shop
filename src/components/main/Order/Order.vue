<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { OrderDto, OrderItemDto } from '@models';
import { useDataStore, useOrderRecordStore } from '@storage';
import OrderProductCard from './OrderProductCard.vue';
import Decimal from 'decimal.js';
const orderStore = useOrderRecordStore();
const dataStore = useDataStore();

const props = defineProps<{
    info: OrderDto;
}>();

const isExpandOrder = ref<boolean>(false);
const ordersItemsList = ref<OrderItemDto[]>([]);

watch(isExpandOrder, async () => {
    const itemList = orderStore.orderItemsList!.filter(x => x.orderId === props.info.id);
    if (itemList === undefined) {
        return;
    }
    ordersItemsList.value = itemList;
})

const toggleExpand = () => {
    isExpandOrder.value = !isExpandOrder.value;
}

const addressInfo = ref<string>("");

const address = dataStore.shippingAddresses!.find(x => x.id === props.info.shippingAddress);

if (address !== undefined)
    addressInfo.value = address.street + ", " + address.house;

const total = ref<Decimal | null>(null);
onMounted(async () => {
    await orderStore.loadOrderItems(props.info.id);
    const smt = await orderStore.calcTotal(props.info.id);
    total.value = smt;
});

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
                <span class="text-large">{{ total }}$</span>
            </div>
            <div class="address-container">
                <span class="text-large">Address info: {{ addressInfo }}</span>
            </div>
        </div>
        <transition name="slide-fade">
            <div v-if="isExpandOrder" class="content">
                <OrderProductCard v-for="value in ordersItemsList" :info="value">
                </OrderProductCard>
            </div>
        </transition>
    </div>
</template>
<style scoped lang="scss">
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.order-container {
    background-color: $linear-card-background-color;
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
        background-color: $button-color;
        transition: all .5s ease;

        &:hover {
            background-color: rgb(189, 218, 243);
            cursor: pointer;
        }
    }
}
</style>