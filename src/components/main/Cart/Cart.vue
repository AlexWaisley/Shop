<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import ProductCard from './ProductCard.vue';
import { useCartStore, useDataStore, useOrderRecordStore } from '@storage';
import Decimal from 'decimal.js';
const cartStore = useCartStore();
const orderStore = useOrderRecordStore();
const dataStore = useDataStore();

const selectedAddress = ref<number>(0);

const isBucketContainsItems = computed<boolean>(() => {
    return cartStore.cart !== null && cartStore.cart.items.length !== 0;
});

const orderSubmitted = ref<boolean>(false);

const submitOrder = () => {
    orderStore.orderConfirmed(selectedAddress.value);
    orderSubmitted.value = true;
}

const totalPrice = ref<Decimal>(new Decimal(0));
console.log(isBucketContainsItems.value);
const totalQuantity = ref<number>(cartStore.calcTotalQuantity());

watch(() => cartStore.cart, async () => {
    totalPrice.value = await cartStore.calcTotal();
    totalQuantity.value = cartStore.calcTotalQuantity();
}, { deep: true });

onMounted(async () => {
    await cartStore.loadCart();
    totalPrice.value = await cartStore.calcTotal();
});

const changeQuantity = async (id: string, quantity: number, productId: string) => {
    await cartStore.changeProductQuantity(id, quantity, productId);
}
</script>
<template>
    <div v-if="isBucketContainsItems" class="cart-container">
        <div class="products-list">
            <ProductCard @change-quantity="changeQuantity" v-for="value in cartStore.cart!.items" :info="value"
                :is-quantity-fixed="false">
            </ProductCard>
        </div>
        <div class="confirm-form">
            <div class="products-quantity">
                <span class="text-large">You have {{ totalQuantity }} product in your bucket</span>
            </div>
            <div class="total-cost">
                <span class="text-large">{{ totalPrice }}$</span>
            </div>
            <div class="shop-address-picker-container">
                <div v-for="(value) in dataStore.shippingAddresses" :key="value.id" class="shop-address-container">
                    <input type="radio" :id="value.id.toString()" :name="'shippingAddress'" :value="value.id"
                        v-model="selectedAddress">
                    <div class="label-container">
                        <label :for="value.id.toString()">{{ value.street }}, {{ value.house }}</label>
                    </div>
                </div>
            </div>
            <div class="submit">
                <button @click="submitOrder" :disabled="selectedAddress === 0" class="buy-button">
                    <span class="text-large">I WILL HAVE ORDER</span>
                </button>
            </div>
        </div>
    </div>
    <div v-else class="clean-bucket-container">
        <span v-if="!orderSubmitted" class="text-large">Why there is nothing? Are you poor or what?</span>
        <span v-else class="text-large">Thank you for purchase ^_^</span>
    </div>

</template>
<style scoped lang="scss">
.cart-container {
    @media screen and (min-width:1050px) {
        display: grid;
        gap: 15px;
        grid-template-columns: 1fr 400px;
    }

    @media screen and (max-width:1050px) {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }


    & .products-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    & .confirm-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        background-color: $sub-main-background-color;
        gap: 15px;
        text-align: center;
        justify-content: space-around;
        padding: 20px;
        height: 300px;

        & .shop-address-picker-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;

            & .shop-address-container {
                width: 100%;
                display: flex;
                justify-content: space-between;

                & .label-container {
                    display: flex;
                    width: 100%;
                    justify-content: center;
                }
            }

        }

        & .submit {
            & .buy-button {
                padding: 10px;
                background-color: $button-color;
                border-radius: 15px;
                width: 100%;
                height: 100%;
                transition: all .5s ease;
                border: none;
                outline: none;

                &:hover {
                    background-color: rgb(101, 186, 219);
                    cursor: pointer;
                }
            }
        }

    }
}

.clean-bucket-container {
    display: flex;
    justify-content: center;
}
</style>