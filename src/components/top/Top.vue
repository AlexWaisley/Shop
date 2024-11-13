<script setup lang="ts">
import { useCartStore, useDisplayInfoStore, useSessionStore } from '@storage';
import SearchBar from './SearchBar.vue';
const sessionStore = useSessionStore();
const cartStore = useCartStore();
const displayInfoStore = useDisplayInfoStore();

const openCart = async () => {
    sessionStore.clearAll();
    displayInfoStore.changeCartStatus(true);
    await cartStore.loadCart();
}

const openAccount = () => {
    sessionStore.clearAll();
    displayInfoStore.changeAccountInfoStatus(true);
}

const openHome = () => {
    sessionStore.clearAll();
    displayInfoStore.changeHomeStatus(true);
}
</script>

<template>
    <div class="top-container">
        <div class="section">
            <div @click="openHome" class="logo-container">
                <img src="/logo.jpg" alt="logo" class="logo-img">
            </div>
        </div>
        <div class="section">
            <SearchBar></SearchBar>
        </div>
        <div class="section">
            <div class="additional-buttons">
                <div v-if="sessionStore.currUser !== null" class="button">
                    <div @click="sessionStore.logOut" class="icon-container">
                        <img src="/logout.svg" alt="account" class="icon">
                    </div>
                </div>
                <div class="button">
                    <div @click="openAccount" class="icon-container">
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
    display: grid;
    grid-template-columns: 80px 1fr 210px;
    background-color: skyblue;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    padding: 0 10px;

    & .section {
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;

        & .logo-container {
            max-height: 70px;
            max-width: 70px;
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

        }
    }

}
</style>
