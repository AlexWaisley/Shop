<script setup lang="ts">
import { ref } from 'vue';
import InputField from './InputField.vue';
import toastr from 'toastr';
import { useSessionStore } from '@storage';
const sessionStore = useSessionStore();

const oldPass = ref<string>("");
const newPass = ref<string>("");
const newPassConf = ref<string>("");

const changePass = () => {
    if (newPass.value !== newPassConf.value) {
        toastr.error("New password and it confirmation is not the same");
    }
    sessionStore.changeUserPassword(oldPass.value, newPass.value);
}

</script>
<template>
    <div class="container">
        <form @submit.prevent="changePass" class="form">
            <InputField v-model="oldPass" type="password" placeholder="Old pass:"></InputField>
            <InputField v-model="newPass" type="password" placeholder="New pass:"></InputField>
            <InputField v-model="newPassConf" type="password" placeholder="New pass confirm:"></InputField>
            <button type="submit">Change password</button>
        </form>
    </div>
</template>
<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;
    display: flex;

    & .form {
        height: 100%;
        align-items: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 30px;
        justify-content: center;
    }
}
</style>