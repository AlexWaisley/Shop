import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router';

import Cart from '@main/Cart/Cart.vue';
import Account from '@main/Account/Account.vue';
import ItemAdmin from '@main/Admin/ItemAdmin.vue';
import ProductsAdmin from '@main/Admin/ProductsAdmin.vue';
import Home from '@main/Home/Home.vue';
import Products from '@main/Products/Products.vue';
import Item from '@main/Item/Item.vue';
import Main from '@main/Home/Main.vue';
import Subcategories from '@main/Subcategories/Subcategories.vue';
import SubcategoriesAdmin from '@main/Admin/SubcategoriesAdmin.vue';

const routes = [
    {
        name: 'Home',
        path: '/',
        redirect: { path: "/main" },
        component: Home,
        children: [
            {
                name: 'Subcategories',
                path: ':name',
                component: Subcategories
            },
            {
                name: 'SubcategoriesAdmin',
                path: 'admin/:name',
                component: SubcategoriesAdmin
            },
            {
                name: 'Main',
                path: 'main',
                component: Main
            }
        ]
    },
    {
        name: 'Cart',
        path: '/cart',
        component: Cart
    },
    {
        name: 'Account',
        path: '/account',
        component: Account
    },
    {
        name: 'ItemAdmin',
        path: '/admin/item',
        component: ItemAdmin
    },
    {
        name: 'ProductsAdmin',
        path: '/:name/admin/products',
        component: ProductsAdmin
    },
    {
        name: 'Products',
        path: '/:name/products',
        component: Products
    },
    {
        name: 'Item',
        path: '/item/:id',
        component: Item
    },
];

import './styles/style.scss'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
const router = createRouter({
    history: createWebHistory(),
    routes
});

app.use(pinia);
app.use(router);
app.mount('#app');
