import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const config = defineConfig(({ mode }) => {
  return {
    root: 'src',
    build: {
      outDir: '../docs',
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
    },
  }
})

export default config
