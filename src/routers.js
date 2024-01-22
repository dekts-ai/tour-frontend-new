
import Index from'./components/Index.vue';
import Init from'./components/Init.vue';
import Checkout from './components/Checkout.vue';
import Thankyou from './components/Thankyou.vue';
import MyTrip from './components/MyTrip.vue';
import Maps from './components/Maps.vue';

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: 'Index',
        component: Index,
        path: '/'
    },
    {
        name: 'Init',
        component: Init,
        path: '/initialize'
    },
    {
        name: 'MyTrip',
        component: MyTrip,
        path: '/mytrip'
    },
    {
        name: 'Maps',
        component: Maps,
        path: '/maps'
    },
    {
        name: 'Checkout',
        component: Checkout,
        path: '/checkout'
    },
    {
        name:'Thankyou',
        component: Thankyou,
        path: '/thankyou'
    },
];
const router = createRouter({
    history:createWebHistory(),
    routes,
});

export default router;