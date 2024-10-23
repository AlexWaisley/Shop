<script setup lang="ts">
import Home from './Home.vue';

import { shallowRef } from 'vue';

const currPage = shallowRef(Home);


</script>

<template>
    <div class="page-container">
        <component :is="currPage" />
    </div>
</template>

<style scoped lang="scss">
.page-container {
    min-height: 500px;
    width: 100%;
    display: flex;
    margin-top: 80px;
}
</style>
