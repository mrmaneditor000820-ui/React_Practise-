import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: "/MaintainIQ-AI-powered-QR-maintenance-system",   // 👈 yahan, plugins array ke bahar
})