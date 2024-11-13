<script setup lang="ts">

const props = defineProps<{
    info: []
}>();

</script>
<template>
    <div class="select">
        <div class="option" v-for="value in dataStore.categories" :key="value.id" :value="value.id">
            {{ value.name }}
        </div>
    </div>
</template>
<style scoped lang="scss"></style>