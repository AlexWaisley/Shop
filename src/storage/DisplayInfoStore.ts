import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import toastr from "toastr";


export const useDisplayInfoStore = defineStore('displayInfo', () => {
    const productPageOpen = ref<boolean>(false);
    const isEditItemPage = ref<boolean>(false);
    const cartStatus = ref<boolean>(false);
    const accountInfoStatus = ref<boolean>(false);
    const homeStatus = ref<boolean>(false);
    const productFullInfoPageStatus = ref<boolean>(false);
    const categoryPageStatus = ref<boolean>(false);
    const adminPanelsOn = useLocalStorage<boolean>("adminPanelsOn", false, { serializer: StorageSerializers.object });

    const changeCategoryPageStatus = (newStatus: boolean) => {
        categoryPageStatus.value = newStatus;
    }

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

    const changeAdminPanelStatus = () => {
        adminPanelsOn.value = !adminPanelsOn.value;
        const mode = adminPanelsOn.value ? "on" : "off";
        const info = "Edit mode " + mode;
        toastr.info(info);
    }

    const resetAll = () => {
        productPageOpen.value = false;
        isEditItemPage.value = false;
        cartStatus.value = false;
        accountInfoStatus.value = false;
        homeStatus.value = false;
        productFullInfoPageStatus.value = false;
        categoryPageStatus.value = false;
    }


    return {
        productPageOpen,
        accountInfoStatus,
        cartStatus,
        homeStatus,
        productFullInfoPageStatus,
        isEditItemPage,
        adminPanelsOn,
        categoryPageStatus,
        changeProductPageOpenStatus,
        changeIsEditItem,
        changeAccountInfoStatus,
        changeCartStatus,
        changeHomeStatus,
        changeProductFullInfoStatus,
        resetAll,
        changeAdminPanelStatus,
        changeCategoryPageStatus
    }
})