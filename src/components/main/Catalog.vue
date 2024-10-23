<script setup lang="ts"></script>
<template>
    <div class="catalog">
        <div v-for="_ in 11" class="category-container">
            <div class="catalog-over"></div>
            <div class="over">
                <span class="text-default">category</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.catalog {
    padding: 20px;
    background-color: rgb(82, 189, 232);
    height: 100%;
    width: 100%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    & .category-container {
        width: 90%;
        height: 100%;
        min-height: 40px;
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;

        & .over {
            position: absolute;
            z-index: 3;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            padding-left: 15px;
        }

        & .catalog-over {
            z-index: 2;
            position: absolute;
            background-color: aliceblue;
            border-bottom-right-radius: 30px 40px;
            width: 90%;
            height: 40px;
            transition: all .5s ease;
            transform: translateX(-300px);
        }

        &:hover {
            cursor: pointer;

            & .catalog-over {
                transform: translateX(0);
            }
        }
    }
}
</style>