<script setup lang="ts">

const emits = defineEmits<{
    (e: 'statusChanged', status: string): void
}>();

const setStatus = async (status: string) => {
    emits('statusChanged', status);
}
</script>
<template>
    <div class="container">
        <div class="form-container">
            <div class="form">
                <button @click="setStatus('Available')">Available</button>
                <button @click="setStatus('Not available')">Not available</button>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    background-color: rgba(0, 0, 0, 0.105);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 7;

    & .form-container {
        width: 50%;
        height: 60%;
        min-height: 200px;
        background-color: rgb(187, 224, 238);
        border-radius: 15px;
        padding: 7px;
        display: flex;
        justify-content: center;
        align-items: center;

        & .form {
            display: flex;
            gap: 40px;
            flex-direction: column;
            justify-content: center;
            width: 50%;

            & .buttons-container {
                width: 100%;
                display: flex;
                justify-content: space-around;
            }
        }

    }

}
</style>