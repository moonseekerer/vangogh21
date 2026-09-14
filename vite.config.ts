import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        archive: path.resolve(__dirname, 'archive.html'),
      },
    },
  },
})
