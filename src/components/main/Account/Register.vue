<script setup lang="ts">
import { useSessionStore } from '@storage';
import { ref } from 'vue';
import InputField from '../General/InputField.vue';
const sessionStore = useSessionStore();

const name = ref<string>("");
const password = ref<string>("");
const email = ref<string>("");

const register = () => {
    sessionStore.register(name.value, email.value, password.value);
}
</script>
<template>
    <div class="register">
        <form @submit.prevent="register" class="register-block">
            <div class="input-fields">
                <InputField v-model="name" placeholder="Name" type="text"></InputField>
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
.register {
    width: 100%;

    & .register-block {
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