import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const config = defineConfig(({ mode }) => {
  return {
    root: 'src/dev',
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: false,
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
