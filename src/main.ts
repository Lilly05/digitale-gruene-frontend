import './styles.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";
import axios from 'axios';

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:3000';
app.config.globalProperties.$axios = axios;

app.use(router)
app.use(createPinia())
app.mount('#app')
