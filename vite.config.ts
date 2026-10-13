import { fileURLToPath, URL } from 'node:url'
import { copyFileSync, cpSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'portfolio-static-assets',
    closeBundle() {
      cpSync('assets', 'dist/assets', { recursive: true })
      copyFileSync('CNAME', 'dist/CNAME')
    },
  }],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
