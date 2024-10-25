<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import ProductCard from './ProductCard.vue';
import { useSessionStore } from '@storage';
import { OrderInfo } from '@models';
const sessionStore = useSessionStore();

const selectedAddress = ref<string>("");

const price = ref<number>(0);
const totalQuantity = computed<number>(() => {
    if (sessionStore.bucket === null) {
        return 0;
    }
    return sessionStore.bucket.products.reduce((acc, value) => acc + value.quantity, 0);
});

watch(() => sessionStore.bucket?.totalCost, (newVal) => {
    if (newVal === undefined) {
        return;
    }
    price.value = newVal;

}, { immediate: true });

const isBucketContainsItems = computed<boolean>(() => {
    return sessionStore.bucket !== null && sessionStore.bucket.products.length !== 0;
});

const orderSubmitted = ref<boolean>(false);

const submitOrder = () => {
    const order = ref<OrderInfo>({
        id: 1,
        bucket: sessionStore.bucket!,
        addressInfo: selectedAddress.value,
        status: "Waiting for answer"
    });
    orderSubmitted.value = true;
    sessionStore.orderConfirmed(order.value);
}


</script>
<template>
    <div v-if="isBucketContainsItems" class="bucket-container">
        <div class="products-list">
            <ProductCard v-for="value in sessionStore.bucket!.products" :info="value" :is-quantity-fixed="false">
            </ProductCard>
        </div>
        <div class="confirm-form">
            <div class="products-quantity">
                <span class="text-large">You have {{ totalQuantity }} product in your bucket</span>
            </div>
            <div class="total-cost">
                <span class="text-large">{{ price }}$</span>
            </div>
            <div class="shop-address-picker-container">
                <div class="shop-address-container">
                    <input type="radio" id="option1" name="option" value="1" v-model="selectedAddress">
                    <div class="label-container">
                        <label for="option1">ул. Николаевская (Короленко), 6 </label>
                    </div>
                </div>
                <div class="shop-address-container">
                    <input type="radio" id="option2" name="option" value="2" v-model="selectedAddress">
                    <div class="label-container">
                        <label for="option2">просп. Независимости, 5</label>
                    </div>
                </div>
                <div class="shop-address-container">
                    <input type="radio" id="option3" name="option" value="3" v-model="selectedAddress">
                    <div class="label-container">
                        <label for="option3">ул. Алчевских, 36</label>
                    </div>
                </div>
            </div>
            <div class="submit">
                <button @click="submitOrder" :disabled="selectedAddress === ''" class="buy-button">
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
.bucket-container {
    display: grid;
    grid-template-columns: 1fr 400px;


    & .products-list {
        max-width: 90%;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    & .confirm-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        background-color: aliceblue;
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
                background-color: skyblue;
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