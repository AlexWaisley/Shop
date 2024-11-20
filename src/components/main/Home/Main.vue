<script setup lang="ts">
import { ref } from 'vue';
import History from './History.vue';

const isShowScroll = ref<boolean>(true);

const showScroll = () => {
    isShowScroll.value = true;
}
const closeScroll = () => {
    setTimeout(() => {
        isShowScroll.value = false;
    }, 500);
}

closeScroll();

</script>
<template>
    <div @mouseover="showScroll" @mouseleave="closeScroll" :class="['main', isShowScroll ? 'show-scrollbar' : '']">
        <History></History>
    </div>
</template>
<style scoped lang="scss">
.main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    transition: all 0.3s ease;

    @include hidden-scroll;
}
</style>