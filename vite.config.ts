import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@storage': path.resolve(__dirname, './src/storage'),
      '@models': path.resolve(__dirname, './src/models'),
      '@components': path.resolve(__dirname, './src/components'),
      '@main': path.resolve(__dirname, './src/components/main'),
      '@top': path.resolve(__dirname, './src/components/top'),
      '@bottom': path.resolve(__dirname, './src/components/bottom'),
      '@api': path.resolve(__dirname, './src/api'),
      '@styles': path.resolve(__dirname, './src/styles'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@styles/variables.scss";
        @import "@styles/mixins.scss";
        `
      }
    }
  }
})
