<script setup lang="ts">
import { ref } from 'vue';
import ProductCard from './ProductCard.vue';

const selectedAddress = ref(null);

</script>
<template>
    <div class="bucket-container">
        <div class="products-list">
            <ProductCard v-for="_ in 9"></ProductCard>
        </div>
        <div class="confirm-form">
            <div class="products-quantity">
                <span class="text-large">U have 1 product in your bucket</span>
            </div>
            <div class="total-cost">
                <span class="text-large">999$</span>
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
                <div class="buy-button">
                    <span class="text-large">I WILL HAVE ORDER</span>
                </div>
            </div>
        </div>
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

                &:hover {
                    background-color: rgb(101, 186, 219);
                    cursor: pointer;
                }
            }
        }

    }
}
</style>