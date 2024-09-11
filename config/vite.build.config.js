import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const config = defineConfig(({ mode }) => {
  return {
    build: {
      lib: {
        entry: 'src/slideshow/index.vue',
        name: 'Slideshow',
        formats: [ 'es' ],
      },
      rollupOptions: {
        output: {},
        external: [
          'vue',
          'pinia',
        ]
      },
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {},
        },
      }),
    ],
  }
})

export default config
