import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import { StripePlugin } from '@vue-stripe/vue-stripe';
import axios from 'axios';
// axios.defaults.baseURL = process.env.NODE_ENV === 'production'?'https://api.nativeamericantours.com/api':'http://127.0.0.1:8000/api';
axios.defaults.baseURL = process.env.NODE_ENV === 'production'?'https://liveapi.nativeamericantours.com/api/':'http://127.0.0.1:8000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
const options = {
    pk: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeAccount: process.env.STRIPE_ACCOUNT,
    apiVersion: process.env.API_VERSION,
    locale: process.env.LOCALE,
  };

createApp(App).use(router, StripePlugin, options).mount('#app')

