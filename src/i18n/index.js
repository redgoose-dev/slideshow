import * as vueI18n from 'vue-i18n/index';
import en from './en.json';
import ko from './ko.json';

export default vueI18n.createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ko,
  },
});
