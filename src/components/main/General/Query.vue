<script setup lang="ts">
import { useSessionStore } from '@storage';
import { computed } from 'vue';

const sessionStore = useSessionStore();

const hasPickedCategories = computed(() => (sessionStore.pickedCategories?.length || 0) > 0);

</script>
<template>
    <nav v-if="hasPickedCategories" class="query">
        <div @click="sessionStore.clearAll" class="prop">
            <span class="text-small">Home</span>
        </div>
        <div v-for="category in sessionStore.pickedCategories" @click="sessionStore.pickCategory(category)"
            class="prop">
            <span class="text-small">{{ category.name }}</span>
        </div>
    </nav>
</template>
<style scoped lang="scss">
.query {
    display: flex;
    padding: 10px;
    height: 44px;
    width: 100%;

    & .prop {
        cursor: pointer;

        & span {
            &:hover {
                text-decoration: underline;
            }
        }

        &::before {
            content: '-';
        }

        &:first-child {
            &::before {
                content: '';
            }
        }
    }
}
</style>