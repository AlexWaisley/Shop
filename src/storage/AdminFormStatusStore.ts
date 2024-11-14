import { defineStore } from "pinia";
import { ref } from "vue";


export const useAdminFormStatusStore = defineStore('adminFormStatus', () => {
    const newPhoto = ref<boolean>(false);
    const newItem = ref<boolean>(false);
    const newCategory = ref<boolean>(false);
    const categoryEdit = ref<boolean>(false);
    const orderStatusEdit = ref<boolean>(false);
    const availabilityEdit = ref<boolean>(false);

    const changeNewPhotoStatus = (newStatus: boolean) => {
        newPhoto.value = newStatus;
    }

    const changeNewItemStatus = (newStatus: boolean) => {
        newItem.value = newStatus;
    }

    const changeNewCategoryStatus = (newStatus: boolean) => {
        newCategory.value = newStatus;
    }

    const changeCategoryEdit = (newStatus: boolean) => {
        categoryEdit.value = newStatus;
    }

    const changeOrderStatusEdit = (newStatus: boolean) => {
        orderStatusEdit.value = newStatus;
    }

    const changeAvailabilityEdit = (newStatus: boolean) => {
        availabilityEdit.value = newStatus;
    }

    const resetAll = () => {
        newPhoto.value = false;
        newCategory.value = false;
        categoryEdit.value = false;
        orderStatusEdit.value = false;
        availabilityEdit.value = false;
    }


    return {
        newPhoto,
        orderStatusEdit,
        categoryEdit,
        availabilityEdit,
        newCategory,
        newItem,
        changeNewPhotoStatus,
        changeNewCategoryStatus,
        changeOrderStatusEdit,
        changeCategoryEdit,
        changeAvailabilityEdit,
        changeNewItemStatus,
        resetAll,
    }
})