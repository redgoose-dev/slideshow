import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'

const config = defineConfig(({ mode }) => {
  return {
    root: 'src',
    build: {
      outDir: '../dist',
      lib: {
        entry: 'slideshow/index.vue',
        name: 'Slideshow',
        fileName: 'vue-slideshow',
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
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
      postcss: {
        plugins: [
          autoprefixer(),
        ],
      },
    },
    esbuild: {},
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
