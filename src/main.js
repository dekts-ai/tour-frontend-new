import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import axios from 'axios';
import store from "./store";
// axios.defaults.baseURL = process.env.NODE_ENV === 'production'?'https://api.nativeamericantours.com/api':'http://127.0.0.1:8000/api';
axios.defaults.baseURL = process.env.NODE_ENV === 'production'?'https://liveapi.nativeamericantours.com/api/':'http://127.0.0.1:8000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

createApp(App).use(router).use(store).mount('#app')
