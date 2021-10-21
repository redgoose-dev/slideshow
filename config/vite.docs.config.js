import { defineConfig, loadEnv } from 'vite';
import autoprefixer from 'autoprefixer';
import base from './vite.base.config';
import { paths } from './options';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_HOST } = env;
  return {
    base: './',
    server: {
      host: VITE_HOST,
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
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
        ],
      },
    },
  };
});
