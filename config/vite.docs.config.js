import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'

const config = defineConfig(({ mode }) => {
  return {
    root: 'src',
    base: './',
    build: {
      outDir: '../docs',
      minify: true,
      sourcemap: false,
      rollupOptions: {
        input: {
          main: './src/docs.html',
        },
        output: {},
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
