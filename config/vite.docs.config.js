import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import { existsSync, renameSync } from 'node:fs'
import { join, resolve } from 'node:path'

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
          index: './src/docs.html',
        },
        output: {
          manualChunks(id)
          {
            if (id.includes('node_modules')) return 'vendor'
          },
          assetFileNames(assetInfo)
          {
            const info = assetInfo.name.split('.')
            const ext = info[info.length - 1]
            if (/woff/i.test(ext))
            {
              return `fonts/[name][extname]`
            }
            else if (/^manifest/.test(info[0]))
            {
              return `[name][extname]`
            }
            else if (/^favicon/.test(info[0]))
            {
              return `[name][extname]`
            }
            else if (/^app-icon/.test(info[0]))
            {
              return `images/[name][extname]`
            }
            else if (/png|jpe?g|svg|ico|webp|gif/i.test(ext))
            {
              return `images/[name]-[hash][extname]`
            }
            return `assets/[name]-[hash][extname]`
          },
        },
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
      if (existsSync(join(dir, 'docs.html')))
      {
        renameSync(join(dir, 'docs.html'), join(dir, 'index.html'))
      }
    }
  }
}

export default config
