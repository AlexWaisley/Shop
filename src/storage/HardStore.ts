import { Category, Subcategory, Item } from "@models";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useHardStore = defineStore('hardStore', () => {
    const categoryList = ref<Category[]>([
        { id: 0, name: "Electronics" },
        { id: 1, name: "Clothing" },
        { id: 2, name: "Home Appliances" },
        { id: 3, name: "Books" },
        { id: 4, name: "Toys" },
        { id: 5, name: "Sports" },
        { id: 6, name: "Music" },
        { id: 7, name: "Furniture" },
        { id: 8, name: "Garden" },
        { id: 9, name: "Automotive" },
        { id: 10, name: "Health" },
        { id: 11, name: "Beauty" },
        { id: 12, name: "Groceries" },
        { id: 13, name: "Pet Supplies" },
        { id: 14, name: "Office Supplies" },
        { id: 15, name: "Art & Craft" },
        { id: 16, name: "Jewelry" },
    ]);

    const subCategoryList = ref<Subcategory[]>([
        { id: 0, categoryId: 0, name: "Mobile Phones" },
        { id: 1, categoryId: 0, name: "Laptops" },
        { id: 2, categoryId: 1, name: "Men's Wear" },
        { id: 3, categoryId: 1, name: "Women's Wear" },
        { id: 4, categoryId: 2, name: "Kitchen Appliances" },
        { id: 5, categoryId: 3, name: "Fiction" },
        { id: 6, categoryId: 4, name: "Action Figures" },
        { id: 7, categoryId: 5, name: "Outdoor Sports" },
        { id: 8, categoryId: 6, name: "Instruments" },
        { id: 9, categoryId: 7, name: "Living Room" },
        { id: 10, categoryId: 8, name: "Garden Tools" },
        { id: 11, categoryId: 9, name: "Car Accessories" },
        { id: 12, categoryId: 10, name: "Supplements" },
        { id: 13, categoryId: 11, name: "Skincare" },
        { id: 14, categoryId: 12, name: "Vegetables" },
        { id: 15, categoryId: 13, name: "Pet Food" },
        { id: 16, categoryId: 14, name: "Stationery" },
        { id: 17, categoryId: 15, name: "Painting Supplies" },
        { id: 18, categoryId: 16, name: "Necklaces" },
    ]);

    const itemList = ref<Item[]>([
        // Items for "Mobile Phones" subcategory
        { id: 0, images: [], name: "iPhone 13", cost: 999, subCategoryId: 0 },
        { id: 1, images: [], name: "Samsung Galaxy S21", cost: 899, subCategoryId: 0 },
        { id: 2, images: [], name: "Google Pixel 6", cost: 799, subCategoryId: 0 },
        { id: 3, images: [], name: "OnePlus 9", cost: 699, subCategoryId: 0 },
        { id: 4, images: [], name: "Sony Xperia 1", cost: 1199, subCategoryId: 0 },
        { id: 5, images: [], name: "Huawei P40", cost: 649, subCategoryId: 0 },
        { id: 6, images: [], name: "Xiaomi Mi 11", cost: 599, subCategoryId: 0 },

        // Items for "Laptops" subcategory
        { id: 7, images: [], name: "MacBook Pro", cost: 1299, subCategoryId: 1 },
        { id: 8, images: [], name: "Dell XPS 13", cost: 1099, subCategoryId: 1 },
        { id: 9, images: [], name: "HP Spectre x360", cost: 1199, subCategoryId: 1 },
        { id: 10, images: [], name: "Asus ZenBook", cost: 999, subCategoryId: 1 },
        { id: 11, images: [], name: "Lenovo ThinkPad", cost: 899, subCategoryId: 1 },
        { id: 12, images: [], name: "Acer Swift 3", cost: 799, subCategoryId: 1 },
        { id: 13, images: [], name: "Microsoft Surface Laptop", cost: 999, subCategoryId: 1 },

        // Items for "Men's Wear" subcategory
        { id: 14, images: [], name: "Men's T-shirt", cost: 29, subCategoryId: 2 },
        { id: 15, images: [], name: "Men's Jeans", cost: 49, subCategoryId: 2 },
        { id: 16, images: [], name: "Men's Jacket", cost: 99, subCategoryId: 2 },
        { id: 17, images: [], name: "Men's Shorts", cost: 39, subCategoryId: 2 },
        { id: 18, images: [], name: "Men's Hoodie", cost: 59, subCategoryId: 2 },
        { id: 19, images: [], name: "Men's Suit", cost: 199, subCategoryId: 2 },
        { id: 20, images: [], name: "Men's Sweater", cost: 79, subCategoryId: 2 },

        // Items for "Women's Wear" subcategory
        { id: 21, images: [], name: "Women's Dress", cost: 59, subCategoryId: 3 },
        { id: 22, images: [], name: "Women's Blouse", cost: 39, subCategoryId: 3 },
        { id: 23, images: [], name: "Women's Skirt", cost: 49, subCategoryId: 3 },
        { id: 24, images: [], name: "Women's Jeans", cost: 69, subCategoryId: 3 },
        { id: 25, images: [], name: "Women's Sweater", cost: 79, subCategoryId: 3 },
        { id: 26, images: [], name: "Women's Jacket", cost: 129, subCategoryId: 3 },
        { id: 27, images: [], name: "Women's Coat", cost: 149, subCategoryId: 3 },

        // Items for "Kitchen Appliances" subcategory
        { id: 28, images: [], name: "Blender", cost: 49, subCategoryId: 4 },
        { id: 29, images: [], name: "Toaster", cost: 29, subCategoryId: 4 },
        { id: 30, images: [], name: "Microwave", cost: 99, subCategoryId: 4 },
        { id: 31, images: [], name: "Coffee Maker", cost: 89, subCategoryId: 4 },
        { id: 32, images: [], name: "Mixer", cost: 69, subCategoryId: 4 },
        { id: 33, images: [], name: "Dishwasher", cost: 399, subCategoryId: 4 },
        { id: 34, images: [], name: "Refrigerator", cost: 999, subCategoryId: 4 },

        // Items for "Fiction" subcategory
        { id: 35, images: [], name: "The Great Gatsby", cost: 10, subCategoryId: 5 },
        { id: 36, images: [], name: "1984", cost: 15, subCategoryId: 5 },
        { id: 37, images: [], name: "To Kill a Mockingbird", cost: 12, subCategoryId: 5 },
        { id: 38, images: [], name: "Pride and Prejudice", cost: 14, subCategoryId: 5 },
        { id: 39, images: [], name: "The Catcher in the Rye", cost: 13, subCategoryId: 5 },
        { id: 40, images: [], name: "Moby Dick", cost: 16, subCategoryId: 5 },
        { id: 41, images: [], name: "Lord of the Flies", cost: 11, subCategoryId: 5 },

        // Items for "Action Figures" subcategory
        { id: 42, images: [], name: "Batman Figure", cost: 25, subCategoryId: 6 },
        { id: 43, images: [], name: "Superman Figure", cost: 27, subCategoryId: 6 },
        { id: 44, images: [], name: "Spider-Man Figure", cost: 30, subCategoryId: 6 },
        { id: 45, images: [], name: "Iron Man Figure", cost: 28, subCategoryId: 6 },
        { id: 46, images: [], name: "Wonder Woman Figure", cost: 26, subCategoryId: 6 },
        { id: 47, images: [], name: "Captain America Figure", cost: 29, subCategoryId: 6 },
        { id: 48, images: [], name: "Thor Figure", cost: 31, subCategoryId: 6 },

        // Items for "Outdoor Sports" subcategory
        { id: 49, images: [], name: "Soccer Ball", cost: 20, subCategoryId: 7 },
        { id: 50, images: [], name: "Basketball", cost: 25, subCategoryId: 7 },
        { id: 51, images: [], name: "Tennis Racket", cost: 50, subCategoryId: 7 },
        { id: 52, images: [], name: "Football", cost: 30, subCategoryId: 7 },
        { id: 53, images: [], name: "Baseball Glove", cost: 40, subCategoryId: 7 },
        { id: 54, images: [], name: "Badminton Set", cost: 35, subCategoryId: 7 },
        { id: 55, images: [], name: "Volleyball", cost: 22, subCategoryId: 7 },

        // Items for "Instruments" subcategory
        { id: 56, images: [], name: "Guitar", cost: 150, subCategoryId: 8 },
        { id: 57, images: [], name: "Piano", cost: 500, subCategoryId: 8 },
        { id: 58, images: [], name: "Drums", cost: 300, subCategoryId: 8 },
        { id: 59, images: [], name: "Violin", cost: 200, subCategoryId: 8 },
        { id: 60, images: [], name: "Flute", cost: 100, subCategoryId: 8 },
        { id: 61, images: [], name: "Saxophone", cost: 400, subCategoryId: 8 },
        { id: 62, images: [], name: "Trumpet", cost: 250, subCategoryId: 8 },
    ]);

    //TODO:Shops addresses
    return { categoryList, subCategoryList, itemList };
});