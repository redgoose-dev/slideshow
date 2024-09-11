import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Main from './main.vue'
import './assets/app.scss'

const app = createApp(Main, {})

const pinia = createPinia()

// set app component
app.use(pinia)
app.mount('#app')
