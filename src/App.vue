<script setup lang="ts">
import PageContainer from '@main/PageContainer.vue';
import Top from '@top/Top.vue';
import Bottom from '@bottom/Bottom.vue';
import { useSessionStore } from '@storage';
import { ref } from 'vue';
const sessionStore = useSessionStore();
sessionStore.initSession();

const isShowScroll = ref<boolean>(true);
const isScrolling = ref<boolean>(false);
let timeout = ref<number | null>(null);

const showScroll = () => {
    isShowScroll.value = true;
    isScrolling.value = true;
    if (timeout.value !== null)
        clearTimeout(timeout.value);
    timeout.value = window.setTimeout(() => {
        if (isScrolling.value === false) {
            isShowScroll.value = false;
            isScrolling.value = false;
        }
    }, 1000);
}

const closeScroll = () => {
    isScrolling.value = false;
}

setTimeout(() => {
    if (isScrolling.value === false)
        isShowScroll.value = false;
}, 2000);
</script>

<template>
    <div @wheel="showScroll" @wheel.stop="closeScroll" :class="['container', isShowScroll ? 'show-scrollbar' : '']">
        <div class="content">
            <Top></Top>
            <PageContainer></PageContainer>
            <Bottom></Bottom>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    max-height: 100%;
    overflow-y: auto;
    scrollbar-color: $scroll-thumb $scroll-background;

    & .content {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        transition: all 0.3s ease; // Smooth fade-in/out
        min-width: 530px;
        background-color: $main-background-color;
    }

}
</style>
