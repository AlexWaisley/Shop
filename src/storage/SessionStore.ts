import { User } from "@models";
import { defineStore } from "pinia";
import { watch } from "vue";
import { useCookies } from '@vueuse/integrations/useCookies';
import { useLocalStorage, StorageSerializers } from "@vueuse/core";
import toastr from 'toastr';
import { userApi } from "@api/index";
import { useDataStore } from "./DataStorage";
import { useDisplayInfoStore } from "./DisplayInfoStore";
import { useCartStore } from "./CartStore";
import { useTokenStore } from "./TokenStorage";

export const useSessionStore = defineStore('sessionStore', () => {
    const cookies = useCookies();
    const dataStore = useDataStore();
    const displayInfoStore = useDisplayInfoStore();
    const cartStore = useCartStore();
    const tokenStore = useTokenStore();

    const history = useLocalStorage<string[] | null>('userHistory', null, { serializer: StorageSerializers.object });
    const currUser = useLocalStorage<User | null>('currUser', null, { serializer: StorageSerializers.object });

    watch(() => cookies.get('ultra-shop-token-refresh'), async (newVal) => {
        if (!newVal) {
            logOut();
        }
    }, { immediate: true });

    const initSession = async () => {
        tokenStore.initSession();
        if (currUser.value) {
            toastr.info(`Welcome back, ${currUser.value.name}`);
        }
        dataStore.loadCategories(0);
    };

    const logOut = () => {
        tokenStore.logOut();
        currUser.value = null;
        cookies.remove('ultra-shop-token-refresh');
        cookies.remove('ultra-shop-token');
        if (displayInfoStore.adminPanelsOn)
            displayInfoStore.changeAdminPanelStatus(false);

        cartStore.cleanCart();
    }

    const isCurrUserAdmin = (): boolean => {
        if (currUser.value === null)
            return false;
        return currUser.value.isAdmin;
    }

    const login = async (email: string, password: string) => {
        if (!validateEmail(email)) {
            toastr.error("Enter valid email");
            return;
        }

        if (password === "") {
            toastr.error("Fill all fields");
            return;
        }

        const user = await userApi.login({ email, password });

        if (user === null) {
            toastr.error("Email or password is wrong");
            return;
        }

        currUser.value = user;
        if (!currUser.value!.email.isActive) {
            toastr.warning("Validate your email");
        }
    }

    const register = async (name: string, email: string, password: string) => {
        if (!validateEmail(email)) {
            toastr.error("Enter valid email");
            return;
        }

        if (name === "" || password === "") {
            toastr.error("Fill all fields");
            return;
        }

        const user = await userApi.register({
            name, email, password
        });

        if (user === null) {
            toastr.error("Email or password is wrong");
            return;
        }

        currUser.value = user;
        if (!currUser.value!.email.isActive) {
            toastr.warning("Validate your email");
        }
    }


    const changeUserPassword = async (oldPassword: string, newPassword: string) => {
        if (currUser.value === null) {
            toastr.error("Sign in account");
            return;
        }

        const result = await userApi.updatePassword({
            oldPassword,
            newPassword
        });

        if (result) {
            toastr.success("Your password is successfully changed");
            return;
        }

        toastr.error("Old password is wrong");
    }

    const changeCurrUserInfo = async (name: string, email: string) => {
        if (currUser.value === null || !validateEmail(email)) {
            toastr.error("Enter valid email");
            return;
        }
        const result = await userApi.updateInfo({
            name,
            email
        });
        if (result) {
            toastr.success("Info about your account is successfully changed");

            return;
        }
        toastr.error("Something went wrong and info not changes.");
    }

    const activateUserEmail = () => {
        if (currUser.value === null)
            return;
        currUser.value.email.isActive = true;
        cookies.set('userSession', currUser.value, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });

        toastr.success("Your email is active now");
    }

    watch(currUser, (newUser) => {
        if (newUser) {
            cookies.set('userSession', newUser, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
            toastr.success('User logged in successfully');
        } else {
            cookies.remove('userSession');
            toastr.info('User logged out');
        }
    });

    const clearAll = () => {
        dataStore.cleanPath();
    }

    const addToHistory = (productId: string) => {
        if (productId === null)
            return;
        if (history.value === null) {
            history.value = [];
        }
        const index = history.value.indexOf(productId);
        if (index !== -1) {
            history.value.splice(index, 1);
        }
        if (history.value.length > 20) {
            history.value.pop();
        }
        history.value.push(productId);
    }

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    return {
        history,
        currUser,
        addToHistory,
        initSession,
        changeUserPassword,
        activateUserEmail,
        changeCurrUserInfo,
        register,
        login,
        clearAll,
        isCurrUserAdmin,
        logOut
    };

});