import { createI18n } from 'vue-i18n/index';
import en from './en.json';
import ko from './ko.json';

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ko,
  },
});
