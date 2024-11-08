<script setup lang="ts">
import { useSessionStore, useOrderRecordStore } from '@storage';
import { onMounted, ref } from 'vue';
import InputField from '../General/InputField.vue';
import Order from '../Order/Order.vue';
import ChangePassword from './ChangePassword.vue';
const sessionStore = useSessionStore();
const orderStore = useOrderRecordStore();

const userName = ref<string>("");
onMounted(async () => {
    await orderStore.loadUserOrders();
})

if (sessionStore.currUser !== null) {
    userName.value = sessionStore.currUser.name;
}

const userEmail = ref<string>("");
const changePassRequired = ref<boolean>(false);

if (sessionStore.currUser !== null) {
    userEmail.value = sessionStore.currUser.email.email;
}

const submitChanges = () => {
    if (userEmail.value !== "" && userName.value !== "")
        sessionStore.changeCurrUserInfo(userName.value, userEmail.value);
}

const validateEmail = () => {
    sessionStore.activateUserEmail();
}

const changePassword = () => {
    changePassRequired.value = true;
}

const openOrders = () => {
    changePassRequired.value = false;
}

const openAllOrders = () => {
    changePassRequired.value = false;

    orderStore.loadOrdersPart();
}

const oneMore = async () => {
    await orderStore.loadOrdersPart();
}

</script>
<template>
    <div class="container">
        <div class="title">
            <span class="text-large">Welcome, {{ userName }}</span>
        </div>
        <div class="main-block">
            <div class="info">
                <InputField placeholder="Name" v-model="userName" type="text"></InputField>
                <InputField placeholder="Email" v-model="userEmail" type="text"></InputField>

                <button @click="submitChanges">
                    <span class="text-large">Submit changes</span>
                </button>

                <button @click="changePassword">
                    <span class="text-large">Change password</span>
                </button>

                <button @click="openOrders">
                    <span class="text-large">Open orders</span>
                </button>

                <button v-if="!sessionStore.currUser?.email.isActive" @click="validateEmail">
                    <span class="text-large">Validate email</span>
                </button>

                <button v-if="sessionStore.currUser?.isAdmin" @click="openAllOrders">
                    <span class="text-large">Open All Orders</span>
                </button>
            </div>
            <div v-if="!changePassRequired" class="section">
                <div v-if="orderStore.orderList !== null && orderStore.orderList.length !== 0" class="orders-list">
                    <Order v-for="value in orderStore.orderList" :info="value"></Order>
                </div>
                <div v-else class="plain">
                    <span class="text-large">You have no orders.</span>
                </div>
                <div v-if="orderStore.allOrders !== null && orderStore.allOrders.length !== 0" class="orders-list">
                    <Order v-for="value in orderStore.allOrders" :info="value"></Order>
                </div>
                <div v-if="sessionStore.isCurrUserAdmin() && orderStore.allOrders !== null && orderStore.allOrders.length % 20 === 0 && orderStore.allOrders.length !== 0"
                    @click="oneMore" class="loader-button">
                    <span class="text-large">Load more</span>
                </div>
            </div>
            <div v-else class="change-pass-container">
                <ChangePassword @changed="changePassword"></ChangePassword>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    gap: 15px;

    & .title {
        width: 100%;
        text-align: center;
    }

    & .main-block {
        background-color: aliceblue;
        border-radius: 15px;
        padding: 15px;
        display: grid;
        grid-template-columns: 200px 1fr;

        & .info {
            padding: 10px 0;
            display: flex;
            flex-direction: column;
            gap: 50px;
        }

        & .section {
            padding: 20px;
            width: 100%;
            text-align: center;
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-direction: column;
            overflow: auto;

            & .orders-list {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
        }
    }
}
</style>