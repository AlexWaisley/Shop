import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useCookies } from '@vueuse/integrations/useCookies';
import { api } from "../api";

export const useTokenStore = defineStore('tokenStore', () => {
    const cookies = useCookies();

    const jwt = ref<string>(cookies.get('ultra-shop-token'));
    const jwtRefresh = ref<string>(cookies.get('ultra-shop-token-refresh'));


    const initSession = async () => {
        if (jwt.value === undefined && jwtRefresh.value !== undefined) {
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
        jwt,
        initSession,
        jwtRefresh,
        refresh,
        logOut
    };

});