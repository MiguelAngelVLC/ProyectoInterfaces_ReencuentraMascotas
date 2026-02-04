import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/ProyectoInterfaces_ReencuentraMascotas/',
  
    build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'pages/contact.html'),
        about: resolve(__dirname, 'pages/about.html'),
        login: resolve(__dirname, 'pages/login.html'), 
        report: resolve(__dirname, 'pages/report.html')
      }
    }
  }
})
