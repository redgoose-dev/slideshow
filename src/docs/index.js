import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './app.vue'
import './assets/main.scss'

const app = createApp(App, {})
const pinia = createPinia()

// set app component
app.use(pinia)
app.mount('#app')
