import scss from 'rollup-plugin-scss';
import { paths } from './options';
import base from './rollup.base.config';

export default {
  input: `${paths.src}/main.js`,
  output: {},
  plugins: [
    ...base.plugins,
    scss({
      output: true,
      outputStyle: 'compressed',
      // processor: () => {},
    }),
  ],
}
