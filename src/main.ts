import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
import { createPinia } from "pinia";
import './style.css'
import '@cyhnkckali/vue3-color-picker/dist/style.css'

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app');
