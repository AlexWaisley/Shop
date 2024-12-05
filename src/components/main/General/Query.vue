<script setup lang="ts">
import { useSessionStore, useDataStore } from '@storage';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const sessionStore = useSessionStore();
const dataStore = useDataStore();
const route = useRoute();

if (route.params.name) {
    dataStore.getFullCategoryPath(route.params.name.toString());
}

watch(() => route.params, () => {
    if (route.params.name) {
        dataStore.getFullCategoryPath(route.params.name.toString());
    }
})
</script>

<template>
    <nav v-if="dataStore.categoryPath.length > 0" class="query">
        <RouterLink to="/main">
            <div @click="sessionStore.clearAll" class="prop">
                <span class="text-small">Home</span>
            </div>
        </RouterLink>
        <div v-for="category in dataStore.categoryPath" class="prop">
            <RouterLink :to="'/' + category.name">
                <span class="text-small">{{ category.name }}</span>
            </RouterLink>
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