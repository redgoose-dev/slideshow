import { createApp } from 'vue';
import { createI18n } from 'vue-i18n/index';
// assets
import store from '~/store';
import messages from '~/messages';
import * as util from '~/libs/util';
import * as local from '~/libs/local';
// components
import App from '~/screen/App';
// style
import '~/scss/main.scss';

// initial i18n
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

// initial custom event
util.initCustomEvent();

// initial app and mount
const app = createApp(App)
  .use(store)
  .use(i18n)
  .mount('#app');

// setup local
local.setup(app);
