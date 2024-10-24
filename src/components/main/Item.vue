<script setup lang="ts">
import ImageBlock from './Item/ImageBlock.vue';
import SpecsBlock from './Item/SpecsBlock.vue';
import { useSessionStore } from '@storage';
const sessionStore = useSessionStore();

</script>
<template>
    <div class="item-container">
        <div class="item">
            <div class="image-container">
                <ImageBlock></ImageBlock>
            </div>
            <div class="fast-info">
                <div class="name-container">
                    <span class="text-large">{{ sessionStore.pickedItem?.name }}</span>
                </div>
                <div class="bucket-container">
                    <div class="price-container">
                        <span class="text-large">{{ sessionStore.pickedItem?.cost }}$</span>
                    </div>
                    <div @click="sessionStore.addToBucket(null)" class="buy-button">
                        <span class="text-large-bold">Buy</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="item-info">
            <div class="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus doloremque, eius
                voluptatem totam illum aperiam ab error veniam vitae labore, odio consequatur commodi eaque magni
                voluptas unde autem. Tempora, a!
                Sequi rerum aliquid tempora omnis a ipsum quidem! Exercitationem repellendus tenetur laboriosam error
                distinctio corrupti, illum quibusdam amet ab aspernatur aperiam veritatis esse voluptates quasi, quidem
                aliquid odit, maxime optio.</div>
            <div class="specs">
                <SpecsBlock></SpecsBlock>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.item-container {
    height: 100%;
    max-width: 1700px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    & .item {
        display: flex;
        border-radius: 15px;
        justify-content: center;
        gap: 15px;

        & .fast-info {
            border-radius: 15px;
            min-width: 400px;
            text-overflow: ellipsis;
            display: flex;
            flex-direction: column;
            gap: 15px;

            & .name-container {
                padding: 20px;
                display: flex;
                width: 400px;
                overflow: hidden;
                text-overflow: ellipsis;
                border-radius: 15px 15px 0 0;
                background-color: aliceblue;
                box-shadow: 3px 3px 3px rgb(216, 237, 255);
            }

            & .bucket-container {
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                background-color: aliceblue;
                border-radius: 0 0 15px 15px;
                box-shadow: 3px 3px 3px rgb(216, 237, 255);

                & .buy-button {
                    background-color: skyblue;
                    user-select: none;
                    padding: 10px;
                    border-radius: 15px;
                    transition: all .5s ease;

                    &:hover {
                        cursor: pointer;
                        background-color: rgb(94, 175, 208);
                    }
                }
            }
        }
    }

    & .item-info {
        display: flex;
        flex-direction: column;
        gap: 15px;
        justify-content: center;
        text-align: justify;
        background-color: aliceblue;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 3px 3px 3px rgb(216, 237, 255);

        & .description {
            width: 100%;
            height: 100%;
            padding: 20px;
            border-radius: 15px;
            background-color: rgb(227, 242, 255);
            box-shadow: 3px 3px 3px rgb(216, 237, 255);
        }


    }
}
</style>