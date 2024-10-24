<script setup lang="ts">
import { OrderInfo } from '@models';
import { ref } from 'vue';
import ProductCard from './bucket/ProductCard.vue';

const props = defineProps<{
    info: OrderInfo;
}>();

const isExpandOrder = ref<boolean>(false);

const toggleExpand = () => {
    isExpandOrder.value = !isExpandOrder.value;
}

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
                <span class="text-large">{{ props.info.bucket.totalCost }}$</span>
            </div>
            <div class="address-container">
                <span class="text-large">Address info: {{ props.info.addressInfo }}</span>
            </div>
        </div>
        <div v-if="isExpandOrder" class="content">
            <ProductCard v-for="value in props.info.bucket.products" :info="value" :is-quantity-fixed="true">
            </ProductCard>
        </div>
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
}
</style>