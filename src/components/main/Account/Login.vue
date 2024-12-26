<script setup lang="ts">
import { useSessionStore } from '@storage';
import InputField from '../General/InputField.vue';
import { ref } from 'vue';
const sessionStore = useSessionStore();


const password = ref<string>("");
const email = ref<string>("");

const logIn = () => {
    sessionStore.login(email.value, password.value);
}
</script>
<template>
    <div class="login">
        <form @submit.prevent="logIn" class="login-block">
            <div class="input-fields">
                <InputField v-model="email" placeholder="Email" type="text"></InputField>
                <InputField v-model="password" placeholder="Password" type="password"></InputField>
            </div>
            <button class="text-button" type="submit">
                <span class="text-large">Submit</span>
            </button>
        </form>
    </div>
</template>
<style scoped lang="scss">
.login {
    width: 100%;

    & .login-block {
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;
        width: 100%;

        & .input-fields {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
            gap: 40px;
        }

        @include text-button(40px, 40%);
    }
}
</style>