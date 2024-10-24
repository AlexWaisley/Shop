<script setup lang="ts">
import PageContainer from '@main/PageContainer.vue';
import Top from '@top/Top.vue';
import Bottom from '@bottom/Bottom.vue';

</script>

<template>
    <div class="container">
        <Top></Top>
        <PageContainer></PageContainer>
        <Bottom></Bottom>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
}
</style>
