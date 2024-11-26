<script setup lang="ts">
import { useAdminFormStatusStore, useSessionStore } from '@storage';

const sessionStore = useSessionStore();
const formStatusStore = useAdminFormStatusStore();


const setStatus = async (status: string) => {
    if (sessionStore.pickedItem === null)
        return;
    sessionStore.pickedItem.isAvailable = status === "Available";
    console.log(sessionStore.pickedItem.isAvailable);
    formStatusStore.changeAvailabilityEdit(false);
}

</script>
<template>
    <div class="form">
        <button @click="setStatus('Available')">Available</button>
        <button @click="setStatus('Not available')">Not available</button>
    </div>
</template>
<style scoped lang="scss">
.form {
    display: flex;
    gap: 40px;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    padding-top: 20px;
    overflow: auto;

    & .buttons-container {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
}
</style>