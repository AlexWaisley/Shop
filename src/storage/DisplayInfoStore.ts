import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import toastr from "toastr";

export const useDisplayInfoStore = defineStore('displayInfo', () => {

    const isEditItemPage = ref<boolean>(false);
    const adminPanelsOn = useLocalStorage<boolean>("adminPanelsOn", false, { serializer: StorageSerializers.object });

    const changeIsEditItem = (newStatus: boolean) => {
        isEditItemPage.value = newStatus;
    }

    const changeAdminPanelStatus = (newStatus: boolean) => {
        adminPanelsOn.value = newStatus;
        const mode = adminPanelsOn.value ? "on" : "off";
        const info = "Edit mode " + mode;
        toastr.info(info);
    }

    const resetAll = () => {
        isEditItemPage.value = false;
    }


    return {
        isEditItemPage,
        adminPanelsOn,
        changeIsEditItem,
        resetAll,
        changeAdminPanelStatus
    }
})