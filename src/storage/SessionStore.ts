import { Category, Product, User } from "@models";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useCookies } from '@vueuse/integrations/useCookies';
import { useLocalStorage, StorageSerializers } from "@vueuse/core";
import toastr from 'toastr';
import { api } from "../api";
import { useDataStore } from "./DataStorage";

export const useSessionStore = defineStore('sessionStore', () => {
    const cookies = useCookies();
    const dataStore = useDataStore();

    const jwt = ref<string>(cookies.get('ultra-shop-token'));
    const history = useLocalStorage<string[] | null>('userHistory', null, { serializer: StorageSerializers.object });
    const currUser = ref<User | null>(cookies.get('userSession') || null);

    const pickedCategories = ref<Category[] | null>(null);
    const pickedItem = ref<Product | null>(null);

    const initSession = () => {
        if (currUser.value) {
            toastr.info(`Welcome back, ${currUser.value.name}`);
        }
    };

    const login = async (email: string, password: string) => {
        if (!validateEmail(email)) {
            toastr.error("Enter valid email");
            return;
        }

        const user = await api.Login({ email, password });

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
        const user = await api.Register({
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

        const result = await api.UpdatePassword({
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
        const result = await api.UpdateInfo({
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

    const pickCategory = (category: Category) => {
        if (pickedCategories.value === null) {
            pickedCategories.value = [];
        }
        pickedCategories.value.push(category);
        if (pickedItem.value !== null) {
            addToHistory(pickedItem.value.id);
            pickedItem.value = null;
        }
    }

    const pickItem = (productId: string) => {
        const product = dataStore.getFullProductById(productId);
        if (product === null) {
            toastr.error("Something went wrong");
            return;
        }
        pickedItem.value = product;
    }

    const clearAll = () => {
        pickedCategories.value = [];

        if (pickedItem.value !== null) {
            addToHistory(pickedItem.value.id);
            pickedItem.value = null;
        }
    }

    const addToHistory = (productId: string) => {
        if (productId === null)
            return;
        if (history.value === null) {
            history.value = [];
        }
        const index = history.value.indexOf(productId);
        console.log(productId);
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
        jwt,
        addToHistory,
        initSession,
        changeUserPassword,
        activateUserEmail,
        changeCurrUserInfo,
        register,
        logIn: login,
        pickCategory,
        pickItem,
        clearAll,
        pickedItem,
    };

});