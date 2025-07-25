import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 10000,
    host: '0.0.0.0',
    allowedHosts: ['curso-fullstack-qrz4.onrender.com'],
  },
})
