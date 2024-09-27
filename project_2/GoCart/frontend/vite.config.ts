/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/project2',
  plugins: [react()],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './tests/setup.ts',
  },
})
