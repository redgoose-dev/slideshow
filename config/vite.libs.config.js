import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import base from './vite.base.config';
import { paths, projectName } from './options';

// TODO: 라이브러리로 계속 번들링을 시도해보았지만 끝내 vue의 문제를 해결하지 못하여 이 상태로 보류하게 되었다.

export default defineConfig(() => {
  return {
    publicDir: false,
    build: {
      minify: false,
      outDir: paths.libs,
      lib: {
        entry: paths.resolve('src/exports.js'),
        name: projectName,
        formats: [ 'es' ],
        fileName: (format) => `${projectName}.${format}.js`
      },
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            switch (assetInfo.name)
            {
              case 'style.css':
                return `${projectName}.css`;
              default:
                return assetInfo.name;
            }
          },
          globals: {
            vue: 'Vue',
            'vue-i18n/index': 'VueI18n',
            'vuex': 'Vuex',
          },
        },
        external: [
          'vue',
          'vuex',
          'vue-i18n/index',
        ],
      },
      sourcemap: true,
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
