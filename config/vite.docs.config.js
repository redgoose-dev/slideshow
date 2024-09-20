import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import { existsSync, renameSync } from 'node:fs'
import { join, resolve } from 'node:path'

const config = defineConfig(() => {
  return {
    root: 'src',
    base: './',
    build: {
      outDir: '../docs',
      minify: true,
      sourcemap: false,
      rollupOptions: {
        input: {
          app: './src/docs.html',
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
      renameHtmlFile(),
    ],
  }
})

function renameHtmlFile()
{
  return {
    name: 'plugin-rename-html-file',
    closeBundle()
    {
      const dir = resolve(__dirname, '../docs')
      const pathDocs = join(dir, 'docs.html')
      if (existsSync(join(dir, 'docs.html')))
      {
        renameSync(join(dir, 'docs.html'), join(dir, 'index.html'))
      }
    }
  }
}

export default config
