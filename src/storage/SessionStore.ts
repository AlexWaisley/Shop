import { Category, Product, User } from "@models";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useCookies } from '@vueuse/integrations/useCookies';
import { useLocalStorage, StorageSerializers } from "@vueuse/core";
import toastr from 'toastr';
import { userApi } from "@api/index";
import { useDataStore } from "./DataStorage";
import { useDisplayInfoStore } from "./DisplayInfoStore";
import { useCartStore } from "./CartStore";
import { useTokenStore } from "./TokenStorage";
import { useProductStore } from "./ProductStore";

export const useSessionStore = defineStore('sessionStore', () => {
    const cookies = useCookies();
    const dataStore = useDataStore();
    const displayInfoStore = useDisplayInfoStore();
    const cartStore = useCartStore();
    const tokenStore = useTokenStore();
    const productStore = useProductStore();

    const history = useLocalStorage<string[] | null>('userHistory', null, { serializer: StorageSerializers.object });
    const currUser = useLocalStorage<User | null>('currUser', null, { serializer: StorageSerializers.object });

    const pickedCategories = ref<Category[] | null>(null);
    const pickedItem = ref<Product | null>(null);

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

        const user = await userApi.login({ email, password });
        tokenStore.jwt = cookies.get('ultra-shop-token');

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
        tokenStore.jwt = cookies.get('ultra-shop-token');
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
            if (cartStore.cart !== null) {
                const itemsToAdd = cartStore.cart.items.filter(cartItem => cartItem.id === "0");
                itemsToAdd.forEach(cartItem => {
                    cartStore.addToCart(cartItem.productId, cartItem.quantity);
                });

                cartStore.cart.items = cartStore.cart.items.filter(cartItem => cartItem.id !== "0");
            }
        } else {
            cookies.remove('userSession');
            toastr.info('User logged out');
        }
    });


    const pickCategory = (category: Category) => {
        if (pickedCategories.value === null) {
            pickedCategories.value = [];
        }
        if (category.parentCategory === 0) {
            pickedCategories.value = [];
        }
        dataStore.loadCategories(category.id);
        pickedCategories.value.push(category);
        if (pickedItem.value !== null) {
            addToHistory(pickedItem.value.id);
            pickedItem.value = null;
        }
        displayInfoStore.changeProductPageOpenStatus(false);
    }

    const pickItem = async (productId: string) => {
        const product = await productStore.getFullProductById(productId);
        if (product === null) {
            toastr.error("Something went wrong");
            return;
        }
        pickedItem.value = product;
        displayInfoStore.changeProductPageOpenStatus(false);
    }

    const clearAll = () => {
        pickedCategories.value = [];

        if (pickedItem.value !== null) {
            addToHistory(pickedItem.value.id);
            pickedItem.value = null;
        }
        displayInfoStore.changeProductPageOpenStatus(false);
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
        pickCategory,
        pickItem,
        clearAll,
        pickedItem,
        pickedCategories,
        isCurrUserAdmin,
        logOut
    };

});