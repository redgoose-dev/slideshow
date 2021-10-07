import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import vuePlugin from 'rollup-plugin-vue';

export default {
  external: [
    'vue',
    'vuex',
    'vue-i18n/index',
  ],
  plugins: [
    nodeResolve(),
    json({ compact: true }),
    vuePlugin({
      target: 'browser',
      cssModulesOptions: {},
      preprocessOptions: {
        //
      },
    }),
  ],
}
