<script setup lang="ts">
import { useSessionStore, useDataStore, useDisplayInfoStore } from '@storage';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const sessionStore = useSessionStore();
const dataStore = useDataStore();
const route = useRoute();
const displayInfoStore = useDisplayInfoStore();

if (route.params.name) {
    dataStore.getFullCategoryPath(route.params.name.toString());
}
if (route.params.id) {
    dataStore.getFullCategoryPath('', route.params.id.toString());
}

watch(() => route.params.name, () => {
    if (route.params.name) {
        dataStore.getFullCategoryPath(route.params.name.toString());
    }
})
watch(() => route.params.id, () => {
    if (route.params.id) {
        dataStore.getFullCategoryPath('', route.params.id.toString());
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
            <RouterLink :to="'/' + (displayInfoStore.adminPanelsOn ? 'admin/' : '') + category.name">
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