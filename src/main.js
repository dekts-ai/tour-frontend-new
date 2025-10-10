import { createApp } from 'vue';
import App from './App.vue';

import router from './routers';
import store from './store/store';

import axios from 'axios';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import VueGoogleMaps from '@fawmi/vue-google-maps';

// Set base API URL based on tenant
const params = new URLSearchParams(window.location.search);
const storedParams = JSON.parse(localStorage.getItem('urlParams') || '{}');

const tenant = params.get("tid") || storedParams.tenantId;
axios.defaults.baseURL = `https://${tenant}.${process.env.VUE_APP_API_URL}`;

// Create and configure app
const app = createApp(App);

app.use(store)
   .use(router)
   .use(VueLoading)
   .use(VueGoogleMaps, {
      load: {
         key: process.env.VUE_APP_MAP_KEY
      }
   });

// Update axios baseURL after store is loaded with correct tenantId from localStorage
if (store.state.tenantId) {
    axios.defaults.baseURL = `https://${store.state.tenantId}.${process.env.VUE_APP_API_URL}`;
}

app.mount('#app');
