import path from 'node:path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
// import react from '@vitejs/plugin-react'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), viteReact()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
