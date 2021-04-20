import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
// store
import store from '~/store/index';
// components
import app from '~/screen/app.vue';
// style
import '~/scss/main.scss';

// initial i18n
const i18n = createI18n({
  locale: 'ko',
  fallbackLocale: 'en',
  messages: {},
});

// initial app and mount
const main = createApp(app)
  .use(store)
  .use(i18n)
  .mount('#app');
