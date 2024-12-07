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
                component: SubcategoriesAdmin,
                meta: {
                    isAdmin: true
                }
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
        path: '/admin/item/:id',
        component: ItemAdmin,
        meta: {
            isAdmin: true
        }
    },
    {
        name: 'ProductsAdmin',
        path: '/:name/admin/products',
        component: ProductsAdmin,
        meta: {
            isAdmin: true
        }
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
    {
        name: 'Search',
        path: '/search/products/part=:part',
        component: Products
    },
];

import './styles/style.scss'
import App from './App.vue'
import { useSessionStore } from '@storage';

const pinia = createPinia()
const app = createApp(App)
app.use(pinia);
const sessionStore = useSessionStore();
const router = createRouter({
    history: createWebHistory(),
    routes
});
router.beforeEach((to) => {
    if (to.meta.isAdmin && !sessionStore.isCurrUserAdmin()) {
        return { name: 'Account' };
    }
});

app.use(router);
app.mount('#app');
