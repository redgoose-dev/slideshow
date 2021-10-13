import { createApp } from 'vue';
import * as local from './libs/local';
import App from './screen/App.vue';
import './assets/scss/app.scss';
import './main.scss';
import example from './example.json';

// initial app and mount
local.initialize({ tree: example });
createApp(App).mount('#slideshow');
