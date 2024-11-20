<script setup lang="ts">
import { shallowRef, watch } from 'vue';
import NewPhoto from './Forms/NewPhoto.vue';
import NewItem from './Forms/NewItem.vue';
import NewCategory from './Forms/NewCategory.vue';
import CategoryEdit from './Forms/CategoryEdit.vue';
import ChangeStatus from './Forms/ChangeStatus.vue';
import AvailabilityStatus from './Forms/AvailabilityStatus.vue';
import { useAdminFormStatusStore } from '@storage';

const form = shallowRef();
const formStatusStore = useAdminFormStatusStore();

function updatePage() {
    switch (true) {
        case formStatusStore.newPhoto:
            form.value = NewPhoto;
            break;
        case formStatusStore.newItem:
            form.value = NewItem;
            break;
        case formStatusStore.newCategory:
            form.value = NewCategory;
            break;
        case formStatusStore.categoryEdit:
            form.value = CategoryEdit;
            break;
        case formStatusStore.orderStatusEdit:
            form.value = ChangeStatus;
            break;
        case formStatusStore.availabilityEdit:
            form.value = AvailabilityStatus;
            break;
        default:
            break;
    }
}

watch(() => formStatusStore.availabilityEdit, updatePage, { immediate: true });
watch(() => formStatusStore.newCategory, updatePage, { immediate: true });
watch(() => formStatusStore.orderStatusEdit, updatePage);
watch(() => formStatusStore.newItem, updatePage);
watch(() => formStatusStore.newPhoto, updatePage, { immediate: true });
watch(() => formStatusStore.categoryEdit, updatePage, { immediate: true });

</script>
<template>
    <div class="container">
        <div class="form-container">
            <component :is="form"></component>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    background-color: rgba(0, 0, 0, 0.105);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;

    & .form-container {
        width: 50%;
        height: 70%;
        min-height: 200px;
        background-color: $sub-main-background-color;
        border-radius: 15px;
        padding: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* 
        & .form {
            display: flex;
            gap: 40px;
            flex-direction: column;
            justify-content: center;
            width: 50%;

            & .buttons-container {
                width: 100%;
                display: flex;
                justify-content: space-around;
            }
        } */

    }

}
</style>