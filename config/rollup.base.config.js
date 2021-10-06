import json from '@rollup/plugin-json';

export default {
  plugins: [
    json({ compact: true }),
  ],
  external: [
    'vue',
    'vuex',
    'vue-i18n/index',
  ],
}
