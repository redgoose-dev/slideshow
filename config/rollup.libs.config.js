import postcss from 'rollup-plugin-postcss';
import { paths, projectName } from './options';
import base from './rollup.base.config';

export default {
  input: `${paths.src}/exports.js`,
  output: [
    {
      file: `${paths.libs}/slideshow.umd.js`,
      format: 'umd',
      exports: 'default',
      name: projectName,
      globals: {
        vue: 'Vue',
        vuex: 'vuex',
        'vue-i18n/index': 'vueI18n',
      },
    },
    {
      file: `${paths.libs}/slideshow.es.js`,
      format: 'es',
    },
  ],
  external: [
    ...base.external,
  ],
  plugins: [
    ...base.plugins,
    postcss({
      extract: `${paths.libs}/slideshow.css`,
      use: [ 'sass' ],
      plugins: [],
    }),
  ],
};
