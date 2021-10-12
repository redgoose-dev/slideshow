import { defineConfig } from 'vite';
import base from './vite.base.config';
import { paths } from './options';

export default defineConfig(() => {
  return {
    base: './',
    server: {
      host: '0.0.0.0',
    },
    build: {
      minify: true,
      outDir: paths.docs,
      sourcemap: false,
    },
    resolve: {
      alias: [
        ...base.resolve.alias,
      ],
    },
    plugins: [
      ...base.plugins,
    ],
  };
});
