import { createApp } from 'vue';
import * as local from '../libs/local';
import External from './External';
import '../assets/scss/app.scss';
import './main.scss';
// import example from '../example.json';

// initial app and mount
local.initialize();
createApp(External).mount('#slideshow');
