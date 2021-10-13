import { defineConfig, loadEnv } from 'vite';
import base from './vite.base.config';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_HOST, VITE_PORT, VITE_OPEN_BROWSER } = env;
  return {
    resolve: {
      alias: [
        ...base.resolve.alias,
      ],
    },
    server: {
      host: VITE_HOST,
      port: VITE_PORT,
      open: VITE_OPEN_BROWSER === 'true',
    },
    plugins: [
      ...base.plugins,
    ],
  };
});
