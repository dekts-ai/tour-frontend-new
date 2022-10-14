import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import axios from 'axios';
import store from "./store";
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { localForageService } from "@/store/localforage";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localForageService.getItem('token');

createApp(App).use(router).use(store).use(VueLoading).mount('#app')
