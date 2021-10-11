import { defineConfig } from 'vite';
import base from './vite.base.config';

export default defineConfig(() => {
  return {
    resolve: {
      alias: [
        ...base.resolve.alias,
      ],
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: false,
    },
    plugins: [
      ...base.plugins,
    ],
  };
});
