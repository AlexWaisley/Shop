<script setup lang="ts">
import { Category } from '@models';
import SubcategoryImage from '@main/General/SubcategoryImage.vue';
import { useDataStore } from '@storage';
import { ref, watch } from 'vue';

const props = defineProps<{
    info: Category;
}>();

const dataStore = useDataStore();

const subCategoriesExists = ref<boolean>(dataStore.isChildExists(props.info.id));
watch(props.info, () => {
    subCategoriesExists.value = dataStore.isChildExists(props.info.id);
})

</script>

<template>
    <RouterLink :to="'/' + props.info.name + (subCategoriesExists ? '' : '/products')">
        <div class="subcategory-card-container">
            <SubcategoryImage :info="props.info"></SubcategoryImage>
            <div class="info-container">
                <div class="info">
                    <div class="name">
                        <span class="text-large-bold">
                            {{ props.info.name }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>
<style scoped lang="scss">
.subcategory-card-container {
    min-width: 250px;
    width: 250px;
    height: 250px;
    gap: 7px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    transition: all .5s ease;
    background-color: $card-background-color;

    & .info-container {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;

        & .info {
            display: flex;
            width: 100%;
            justify-content: space-around;
        }
    }

    &:hover {
        cursor: pointer;
        box-shadow: rgb(80, 160, 192) 0px 0px 7px 0px;

    }
}
</style>