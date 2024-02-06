import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import axios from 'axios';
import store from "./store/store";
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueGoogleMaps from '@fawmi/vue-google-maps'

// axios.defaults.baseURL = process.env.VUE_APP_API_URL;

let tenant = "dixies";
let uri = window.location.search.substring(1);
if (uri != '') {
    let params = new URLSearchParams(uri);
    tenant = params.get("tid") !== null ? params.get("tid") : "dixies";
}

const url = process.env.VUE_APP_API_URL;
axios.defaults.baseURL = `https://${url}`;

if (tenant) {
    axios.defaults.baseURL = `https://${tenant}.${url}`;
}

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueLoading);
app.use(VueGoogleMaps, {
    load: {
      key: process?.env?.VUE_APP_MAP_KEY ?? 'AIzaSyDF9aefrWoTkLQzx5HJUmPOy3_o6vxJmyw',
      version: 'weekly'
    }
});

app.mount('#app');