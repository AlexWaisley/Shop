import { Category, Item, Subcategory } from "@models";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSessionStore = defineStore('sessionStore', () => {

    const history = ref<Item[] | null>(null);
    const bucket = ref<Item[] | null>(null);
    const pickedCategory = ref<Category | null>(null);
    const pickedSubcategory = ref<Subcategory | null>(null);
    const pickedItem = ref<Item | null>(null);

    const pickCategory = (category: Category) => {
        pickedCategory.value = category;
        pickedSubcategory.value = null;
        addToHistory();
        pickedItem.value = null;
    }
    const pickSubcategory = (subcategory: Subcategory) => {
        pickedSubcategory.value = subcategory;
    }
    const pickItem = (item: Item) => {
        pickedItem.value = item;
    }
    const clearAll = () => {
        pickedCategory.value = null;
        pickedSubcategory.value = null;
        addToHistory();
        pickedItem.value = null;
    }
    const addToHistory = () => {
        if (pickedItem.value !== null) {
            if (history.value === null) {
                history.value = [];
            }
            const index = history.value.indexOf(pickedItem.value);
            if (index !== -1) {
                history.value.splice(index, 1);
            }
            if (history.value.length > 20) {
                history.value.pop();
            }
            history.value.push(pickedItem.value);

        }
    }

    return { history, pickCategory, pickItem, pickSubcategory, clearAll, pickedCategory, pickedItem, pickedSubcategory };

});