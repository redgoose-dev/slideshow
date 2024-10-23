import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const config = defineConfig(({ mode }) => {
  const { VITE_HOST, VITE_PORT } = loadEnv(mode, process.cwd())
  return {
    root: 'src',
    server: {
      host: VITE_HOST,
      port: Number(VITE_PORT),
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
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
