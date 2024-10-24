<script setup lang="ts">
import { Item } from '@models';
import { useSessionStore } from '@storage';

const sessionStore = useSessionStore();

const props = defineProps<{
    info: Item;
}>();
</script>
<template>
    <div class="item-card-container">
        <div @click="sessionStore.pickItem(props.info)" class="image-container">
            <img src="/logo.jpg" alt="Item image" class="item-image">
        </div>
        <div class="info-container">
            <div @click="sessionStore.pickItem(props.info)" class="info">
                <div class="name">
                    <span class="text-large">
                        {{ props.info.name }}
                    </span>
                </div>
            </div>
            <div class="info">
                <div class="cost">
                    <span class="text-large-bold">{{ props.info.cost }}$</span>
                </div>
                <div @click="sessionStore.addToBucket(props.info)" class="buy-button">
                    <span class="text-large">Buy</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.item-card-container {
    min-width: 250px;
    height: 250px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 7px;
    background-color: aqua;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    box-shadow: 3px 3px 3px rgb(55, 230, 230);
    transition: all .5s ease;

    & .image-container {
        max-height: 150px;
        max-width: 200px;
        overflow: hidden;

        & .item-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }

    & .info-container {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;

        & .info {
            display: flex;
            width: 100%;
            justify-content: space-around;
            align-items: center;

            & .buy-button {
                background-color: skyblue;
                padding: 7px;
                border-radius: 15px;
                transition: all .5s ease;
                z-index: 5;
                user-select: none;

                &:hover {
                    cursor: pointer;
                    background-color: rgb(94, 175, 208);
                }
            }

        }
    }

    &:hover {
        cursor: pointer;
        box-shadow: 12px 12px 12px rgb(97, 185, 220);

    }
}
</style>