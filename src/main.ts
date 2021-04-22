import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
// components
import App from '~/screen/App.vue';
// assets
import store from '~/store/index.js';
import messages from '~/messages';
import initCustomEvent from '~/libs/initCustomEvent';
// style
import '~/scss/main.scss';

// initial i18n
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

// initial custom event
initCustomEvent();

// initial app and mount
const main = createApp(App)
  .use(store)
  .use(i18n)
  .mount('#app');
