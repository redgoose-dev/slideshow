import scss from 'rollup-plugin-scss';
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
        vuex: 'vuex',
        'vue-i18n/index': 'i18n',
      },
    },
    {
      file: `${paths.libs}/slideshow.es.js`,
      format: 'es',
    }
  ],
  external: [
    ...base.external,
  ],
  plugins: [
    ...base.plugins,
    scss({
      output: `${paths.libs}/slideshow.css`,
      // processor: () => {},
    }),
  ],
};
