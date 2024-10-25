<script setup lang="ts">
import { useSessionStore } from '@storage';
import { ref } from 'vue';
import InputField from './InputField.vue';
import AccountInfo from './AccountInfo.vue';
const sessionStore = useSessionStore();

const name = ref<string>("");
const password = ref<string>("");

const logIn = () => {
    sessionStore.logIn(name.value, password.value);
}
const register = () => {
    sessionStore.register(name.value, password.value);
}
</script>
<template>
    <div class="account-container">
        <div v-if="sessionStore.currUser === null" class="load-account">
            <form @submit.prevent="logIn" class="login-block">
                <div class="input-fields">
                    <InputField v-model="name" placeholder="Email" type="text"></InputField>
                    <InputField v-model="password" placeholder="Password" type="password"></InputField>
                </div>
                <div class="submit-btns">
                    <button type="button" @click="register">Register</button>
                    <button type="submit">Login</button>
                </div>
            </form>

        </div>
        <div v-else class="account-info">
            <AccountInfo></AccountInfo>
        </div>
    </div>
</template>
<style scoped lang="scss">
.account-container {
    padding: 20px;
    width: 100%;
    display: flex;


    & .load-account {

        display: flex;
        width: 100%;
        align-items: center;
        flex-direction: column;
        gap: 40px;


        & .login-block {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            min-width: 300px;

            & .input-fields {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                gap: 40px;
            }

            & .submit-btns {
                display: flex;
                width: 100%;
                justify-content: space-between;

            }
        }

    }

    & .account-info {
        width: 100%;
    }
}
</style>