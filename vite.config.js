import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' makes the built site work on GitHub Pages whether it is served from
// https://<user>.github.io/ or https://<user>.github.io/<repo>/ without changes.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 600,
  },
})
