import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
import { defineConfig } from 'vite'

dotenv.config()

// https://vitejs.dev/config/

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  resolve: {
    alias: {
      app: path.resolve(__dirname, './src/app'),
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      features: path.resolve(__dirname, './src/features'),
      shared: path.resolve(__dirname, './src/shared'),
    },
  },
  build: {
    ssr: true,
    outDir: path.join(__dirname, 'dist/client'),
    rollupOptions: {
      input: {
        app: './index.html',
        sw: './src/sw.js',
      },
      output: {
        format: 'cjs',
      },
      // output: {
      //   entryFileNames: ({ name }) => {
      //     if (/sw/.test(name)) {
      //       return `[name].js`
      //     }
      //
      //     return `assets/[name].js`
      //   },
      //   chunkFileNames: `assets/[name].js`,
      //   assetFileNames: `assets/[name].[ext]`,
      // },
    },
  },
})
