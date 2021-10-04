import { createApp } from 'vue';
// assets
import store from './store';
import i18n from './i18n';
// components
import App from './screen/App.vue';
// style
import './assets/scss/main.scss';
// get example
import example from './example.json';

// check app element
if (!document.getElementById('app'))
{
  let element = document.createElement('main');
  element.setAttribute('id', 'app');
  document.body.append(element);
}
// check modal element
if (!document.getElementById('modal'))
{
  let element = document.createElement('div');
  element.setAttribute('id', 'modal');
  document.body.append(element);
}

// initial app and mount
App.initialize({ tree: example });
createApp(App).use(store).use(i18n).mount('#app');
