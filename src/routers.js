
import Index from'./components/Index.vue';
import Init from'./components/Init.vue';
import Payment from './components/Payment.vue';
import Thankyou from './components/Thankyou.vue';
// placeholder for gpay|applepay
//import PaymentForm from './components/Checkout/PaymentForm';
//import PaymentSuccess from './components/Checkout/PaymentSuccess';

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
        name: 'Payment',
        component: Payment,
        path: '/Payment'
    },
    {
        name:'Thankyou',
        component: Thankyou,
        path: '/Thankyou'
    },


    // placeholder for dynamic gpay/apple pay

    // {
    //     name: 'PaymentForm',
    //     component: PaymentForm,
    //     path: '/checkout'
    // },

    // {
    //     name: 'PaymentSuccess',
    //     component: PaymentSuccess,
    //     path: '/success'
    //},
];
const router = createRouter({
    history:createWebHistory(),
    routes,
});

export default router;