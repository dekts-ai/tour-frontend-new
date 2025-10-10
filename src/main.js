import { createApp } from 'vue';
import App from './App.vue';

import router from './routers';
import store from './store/store';

import axios from 'axios';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import VueGoogleMaps from '@fawmi/vue-google-maps';

// Axios interceptor to dynamically set baseURL from store/localStorage before each request
axios.interceptors.request.use(config => {
    let tenantId = store.state.tenantId;
    
    // Fallback to localStorage or URL params if store doesn't have tenantId yet
    if (!tenantId) {
        const params = new URLSearchParams(window.location.search);
        const storedParams = JSON.parse(localStorage.getItem('urlParams') || '{}');
        tenantId = params.get("tid") || storedParams.tenantId;
    }
    
    if (tenantId) {
        config.baseURL = `https://${tenantId}.${process.env.VUE_APP_API_URL}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

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

app.mount('#app');
