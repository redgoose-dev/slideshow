import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './index.vue'
import './assets/app.scss'

const app = createApp(App, {})

const pinia = createPinia()

// set app component
app.use(pinia)
app.mount('#app')