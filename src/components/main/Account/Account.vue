<script setup lang="ts">
import { useSessionStore } from '@storage';
import { ref } from 'vue';
import Login from './Login.vue';
import Register from './Register.vue';
import AccountInfo from './AccountInfo.vue';
const sessionStore = useSessionStore();

const isRegister = ref<boolean>(false);
</script>
<template>
    <div class="account-container">
        <div v-if="sessionStore.currUser === null" class="load-account">
            <div class="section">
                <div @click="isRegister = false" :data-picked="!isRegister" class="switcher">
                    <span class="text-large">
                        Login
                    </span>
                </div>
                <div @click="isRegister = true" class="switcher">
                    <span class="text-large">
                        Register
                    </span>
                </div>
                <div class="underline"> </div>
            </div>
            <div class="section forms">
                <div :data-picked="!isRegister" class="login-container">
                    <Login />
                </div>
                <div :data-picked="isRegister" class="register-container">
                    <Register />
                </div>
            </div>
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

        & .section {
            display: flex;
            width: 300px;
            justify-content: center;
            position: relative;
            overflow: hidden;

            &.forms {
                position: relative;
                height: 500px;

                & .login-container,
                & .register-container {
                    width: 100%;
                    display: flex;
                    transition: transform 0.5s ease-in-out;
                    transform: translateX(0);
                    position: absolute;
                }

                & .login-container[data-picked="false"] {
                    transform: translateX(-110%);
                }

                & .register-container[data-picked="false"] {
                    transform: translateX(110%);
                }

            }

            & .switcher[data-picked="false"]~.underline {
                transform: translateX(100%);
            }

            & .switcher[data-picked="true"]~.underline {
                transform: translateX(0);
            }


            & .underline {
                height: 2px;
                width: 50%;
                background-color: blue;
                position: absolute;
                left: 0;
                bottom: 0;
                transition: all .5s ease;
                transform: translateX(0);
            }

            & .switcher {
                padding: 15px;
                transition: all .5s ease;
                position: relative;
                width: 150px;
                text-align: center;

                &:hover {
                    color: rgb(60, 142, 169);
                }
            }
        }
    }

    & .account-info {
        width: 100%;
    }
}
</style>