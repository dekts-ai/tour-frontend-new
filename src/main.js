import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import axios from 'axios';
import store from "./store/store";
import eventBus from './eventBus';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// axios.defaults.baseURL = process.env.VUE_APP_API_URL;

let tenant = "dixie";
let uri = window.location.search.substring(1);
if (uri != '') {
    let params = new URLSearchParams(uri);
    tenant = params.get("tid") !== null ? params.get("tid") : null;
}

const url = process.env.VUE_APP_API_URL;
axios.defaults.baseURL = `https://${url}`;

if (tenant) {
    axios.defaults.baseURL = `https://${tenant}.${url}`;
}

createApp(App).use(router).use(store).use(eventBus).use(VueLoading).mount('#app')