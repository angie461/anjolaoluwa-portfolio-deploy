
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  // The second, server-side build (used only to prerender pages) doesn't need a copy of public/.
  build: isSsrBuild ? { copyPublicDir: false } : {},
}))
