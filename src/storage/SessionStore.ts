import { BucketInfo, BucketProduct, Category, Item, OrderInfo, Subcategory, User } from "@models";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useHardStore } from "./HardStore";

export const useSessionStore = defineStore('sessionStore', () => {
    const hardStore = useHardStore();

    const history = ref<Item[] | null>(null);
    const bucket = ref<BucketInfo | null>(null);
    const pickedCategory = ref<Category | null>(null);
    const pickedSubcategory = ref<Subcategory | null>(null);
    const pickedItem = ref<Item | null>(null);
    const displayedProducts = ref<Item[] | null>(null);
    const currUser = ref<User | null>(null);

    const pickCategory = (category: Category) => {
        pickedCategory.value = category;
        pickedSubcategory.value = null;
        addToHistory();
        pickedItem.value = null;
    }
    const pickSubcategory = (subcategory: Subcategory) => {
        pickedSubcategory.value = subcategory;
        displayedProducts.value = hardStore.itemList.filter(x => x.subCategoryId === subcategory.id);
    }
    const pickItem = (item: Item) => {
        if (pickedCategory.value === null || pickedSubcategory === null) {
            const subCategory = hardStore.subCategoryList.find(x => x.categoryId === item.subCategoryId);
            if (subCategory === undefined) {
                console.log("Bruh");
                return;
            }
            pickedSubcategory.value = subCategory;
            const category = hardStore.categoryList.find(x => x.id === subCategory.categoryId);
            if (category === undefined) {
                console.log("Bruh");
                return;
            }
            pickedCategory.value = category;
        }
        pickedItem.value = item;
    }
    const clearAll = () => {
        pickedCategory.value = null;
        pickedSubcategory.value = null;
        addToHistory();
        pickedItem.value = null;
        displayedProducts.value = null
    }
    const addToHistory = (product = pickedItem.value) => {
        if (product === null && pickedItem.value !== null) {
            product = pickedItem.value;
        }
        if (product === null)
            return;
        if (history.value === null) {
            history.value = [];
        }
        const index = history.value.indexOf(product);
        if (index !== -1) {
            history.value.splice(index, 1);
        }
        if (history.value.length > 20) {
            history.value.pop();
        }
        history.value.push(product);

    }

    const addToBucket = (product: Item | null) => {
        if (product === null) {
            if (pickedItem.value === null) {
                console.log("Bruh");
                return;
            }
            product = pickedItem.value;
        }
        if (bucket.value === null) {
            bucket.value = { products: [], totalCost: 0 };
        }
        addToHistory(product);
        if (bucket.value.products.find(x => x.product === product) === undefined)
            bucket.value.products.push({ product, quantity: 1, totalCost: product.cost });
    }
    const removeFromBucket = (product: BucketProduct) => {
        if (bucket.value === null) {
            bucket.value = { products: [], totalCost: 0 };
        }
        const itemIndex = bucket.value.products.indexOf(product);
        if (itemIndex === -1) {
            console.log("Bruh");
            return;
        }
        bucket.value.products.splice(itemIndex, 1);
    }

    const changeQuantityOfProductInBucket = (bucketProduct: BucketProduct, newQuantity: number) => {
        if (bucket.value === null) {
            bucket.value = { products: [], totalCost: 0 };
        }
        const index = bucket.value.products.indexOf(bucketProduct);
        bucket.value.products[index].quantity = newQuantity;
        bucket.value.products[index].totalCost = bucket.value.products[index].product.cost * bucket.value.products[index].quantity;
        calcTotal();
    }

    const calcTotal = () => {
        if (bucket.value === null) {
            bucket.value = { products: [], totalCost: 0 };
        }
        bucket.value.totalCost = bucket.value.products.reduce((acc, value) => acc + value.product.cost * value.quantity, 0);
    }

    const orderConfirmed = (order: OrderInfo) => {
        if (currUser.value === null) {
            return;
        }
        if (currUser.value.orderInfo === null) {
            currUser.value.orderInfo = [];
        }

        currUser.value.orderInfo.push(order);

        console.log(currUser.value);

        bucket.value = null;
    }

    const startSearch = (name: string) => {
        displayedProducts.value = hardStore.itemList.filter(x => x.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
    }

    const logIn = (name: string, password: string) => {
        currUser.value = { name, email: "example@gmail.com", password, orderInfo: null };
    }
    const register = (email: string, password: string) => {
        currUser.value = { name: "", email, password, orderInfo: null };
    }

    const changeCurrUserEmail = (email: string) => {
        if (currUser.value === null)
            return;
        currUser.value.email = email;
    }
    const changeCurrUserName = (name: string) => {
        if (currUser.value === null)
            return;
        currUser.value.name = name;
    }
    return { history, currUser, bucket, displayedProducts, changeCurrUserEmail, changeCurrUserName, register, logIn, startSearch, changeQuantityOfProductInBucket, orderConfirmed, pickCategory, pickItem, pickSubcategory, clearAll, addToBucket, removeFromBucket, pickedCategory, pickedItem, pickedSubcategory };

});