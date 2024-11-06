<script setup lang="ts">
import { useCartStore, useSessionStore } from '@storage';
import SearchBar from './SearchBar.vue';
const sessionStore = useSessionStore();
const cartStore = useCartStore();
const eventE = defineEmits<{
    (e: 'openBucket'): void,
    (e: 'goHome'): void,
    (e: 'openAccount'): void,
}>();

const openCart = async () => {
    eventE('openBucket');
    await cartStore.loadCart();
}
</script>

<template>
    <div class="top-container">
        <div class="section">
            <div @click="$emit('goHome')" class="logo-container">
                <img src="/logo.jpg" alt="logo" class="logo-img">
            </div>
        </div>
        <div class="section">
            <div class="searchbar">
                <SearchBar></SearchBar>
            </div>
        </div>
        <div class="section">
            <div class="additional-buttons">
                <div v-if="sessionStore.currUser !== null" class="button">
                    <div @click="sessionStore.logOut" class="icon-container">
                        <img src="/logout.svg" alt="account" class="icon">
                    </div>
                </div>
                <div class="button">
                    <div @click="$emit('openAccount')" class="icon-container">
                        <img src="/account.svg" alt="account" class="icon">
                    </div>
                </div>
                <div @click="openCart" class="button">
                    <div class="icon-container">
                        <img src="/cart.svg" alt="cart" class="icon">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.top-container {
    z-index: 5555;
    width: 100%;
    height: 80px;
    display: flex;
    background-color: skyblue;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    position: fixed;

    & .section {
        height: 80px;
        display: flex;
        align-items: center;

        & .logo-container {
            max-height: 60px;
            max-width: 60px;
            overflow: hidden;
            cursor: pointer;

            & .logo-img {
                max-height: 100%;
                max-width: 100%;
                object-fit: contain;
            }
        }

        & .additional-buttons {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;


            & .button {
                height: 60px;
                width: 60px;
                padding: 10px;
                display: flex;
                justify-content: center;
                border: 1px solid transparent;
                align-items: center;
                border-radius: 15px;
                transition: all .5s ease;

                & .icon-container {
                    max-width: 100%;
                    max-height: 100%;
                    overflow: hidden;

                    & .icon {
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                    }
                }

                &:hover {
                    cursor: pointer;
                    border: 1px solid blue;
                }
            }
        }
    }

}
</style>
