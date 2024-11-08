import { defineStore } from "pinia";
import { ref } from "vue";

export const useDisplayInfoStore = defineStore('displayInfo', () => {
    const productPageOpen = ref<boolean>(false);
    const isEditItemPage = ref<boolean>(false);
    const cartStatus = ref<boolean>(false);
    const accountInfoStatus = ref<boolean>(false);
    const homeStatus = ref<boolean>(false);
    const productFullInfoPageStatus = ref<boolean>(false);

    const changeProductPageOpenStatus = (newStatus: boolean) => {
        productPageOpen.value = newStatus;
    }

    const changeIsEditItem = (newStatus: boolean) => {
        isEditItemPage.value = newStatus;
    }

    const changeCartStatus = (newStatus: boolean) => {
        cartStatus.value = newStatus;
    }

    const changeAccountInfoStatus = (newStatus: boolean) => {
        accountInfoStatus.value = newStatus;
    }

    const changeHomeStatus = (newStatus: boolean) => {
        homeStatus.value = newStatus;
    }

    const changeProductFullInfoStatus = (newStatus: boolean) => {
        productFullInfoPageStatus.value = newStatus;
    }

    const resetAll = () => {
        productPageOpen.value = false;
        isEditItemPage.value = false;
        cartStatus.value = false;
        accountInfoStatus.value = false;
        homeStatus.value = false;
        productFullInfoPageStatus.value = false;
    }


    return {
        productPageOpen,
        accountInfoStatus,
        cartStatus,
        homeStatus,
        productFullInfoPageStatus,
        isEditItemPage,
        changeProductPageOpenStatus,
        changeIsEditItem,
        changeAccountInfoStatus,
        changeCartStatus,
        changeHomeStatus,
        changeProductFullInfoStatus,
        resetAll
    }
})