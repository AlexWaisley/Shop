<script setup lang="ts">
import { Item } from '@models';
import { useSessionStore } from '@storage';

const sessionStore = useSessionStore();

const props = defineProps<{
    info: Item;
}>();
</script>
<template>
    <div @click="sessionStore.pickItem(props.info)" class="subcategory-card-container">
        <div class="image-container">
            <img src="/logo.jpg" alt="Item image" class="subcategory-image">
        </div>
        <div class="info-container">
            <div class="info">
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
                <div class="buy-button">Buy</div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.subcategory-card-container {
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

        & .subcategory-image {
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
        }
    }

    &:hover {
        cursor: pointer;
        box-shadow: 12px 12px 12px rgb(97, 185, 220);

    }
}
</style>