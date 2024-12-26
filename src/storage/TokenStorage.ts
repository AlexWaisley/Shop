import { defineStore } from "pinia";
import { watch } from "vue";
import { useCookies } from '@vueuse/integrations/useCookies';
import { api } from "../api";

export const useTokenStore = defineStore('tokenStore', () => {
    const cookies = useCookies();

    const initSession = async () => {
        if (cookies.get('ultra-shop-token') === undefined && cookies.get('ultra-shop-token-refresh') !== undefined) {
            await refresh();
        }
    };

    const logOut = () => {
        cookies.remove('ultra-shop-token-refresh');
        cookies.remove('ultra-shop-token');
    }


    watch(() => cookies.get('ultra-shop-token'), async (newVal) => {
        if (newVal === undefined) {
            const res = await api.RefreshToken();
            if (!res) {
                logOut();
            }
        }
    })

    const refresh = async () => {
        await api.RefreshToken();
    }

    return {
        initSession,
        refresh,
        logOut
    };

});