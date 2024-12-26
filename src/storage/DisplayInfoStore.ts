import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

import toastr from "toastr";

export const useDisplayInfoStore = defineStore('displayInfo', () => {

    const adminPanelsOn = useLocalStorage<boolean>("adminPanelsOn", false, { serializer: StorageSerializers.object });

    const changeAdminPanelStatus = (newStatus: boolean) => {
        adminPanelsOn.value = newStatus;
        const mode = adminPanelsOn.value ? "on" : "off";
        const info = "Edit mode " + mode;
        toastr.info(info);
    }

    return {
        adminPanelsOn,
        changeAdminPanelStatus
    }
})