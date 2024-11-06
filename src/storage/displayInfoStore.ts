import { defineStore } from "pinia";
import { ref } from "vue";

export const useDisplayInfoStore = defineStore('displayInfo', () => {
    const productPageOpen = ref<boolean>(false);

    const changeProductPageOpenStatus = (newStatus: boolean) => {
        productPageOpen.value = newStatus;
    }

    return {
        productPageOpen,
        changeProductPageOpenStatus,

    }
})