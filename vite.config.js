import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: served from a GitHub Pages project subpath (brbrlim.github.io/kaist/)
export default defineConfig({
  base: '/kaist/',
  plugins: [react()],
})
