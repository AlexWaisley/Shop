<script setup lang="ts">
import { useSessionStore } from '@storage';
import { ref } from 'vue';
import InputField from './InputField.vue';
import Order from './Order.vue';
const sessionStore = useSessionStore();

const userName = ref<string>("");

if (sessionStore.currUser !== null) {
    userName.value = sessionStore.currUser.name;
}

const userEmail = ref<string>("");

if (sessionStore.currUser !== null) {
    userEmail.value = sessionStore.currUser.email;
}

const submitEmail = () => {
    if (userEmail.value !== "")
        sessionStore.changeCurrUserEmail(userEmail.value);
}
const submitName = () => {
    if (userEmail.value !== "") {
        sessionStore.changeCurrUserName(userName.value);
    }
}

const submitChanges = () => {
    submitEmail();
    submitName();
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

            </div>
            <div class="section">
                <div v-if="sessionStore.currUser?.orderInfo !== null && sessionStore.currUser?.orderInfo?.length !== 0"
                    class="orders-list">
                    <Order v-for="value in sessionStore.currUser?.orderInfo" :info="value"></Order>
                </div>
                <div v-else class="plain">
                    <span class="text-large">You have no orders.</span>
                </div>
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
        }
    }
}
</style>