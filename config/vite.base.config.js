import vue from '@vitejs/plugin-vue';
import { paths } from './options';

// docs: https://vitejs.dev/config

export default {
  resolve: {
    alias: [
      {
        find: '~',
        replacement: paths.src,
      }
    ],
  },
  plugins: [
    vue(),
  ],
};
