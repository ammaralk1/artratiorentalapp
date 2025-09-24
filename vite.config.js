import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: '/artratiorentalapp/',
  server: {
    port: 5173,
    open: '/src/pages/dashboard.html'
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        dashboard: resolve(__dirname, 'src/pages/dashboard.html'),
        login: resolve(__dirname, 'src/pages/login.html'),
        customer: resolve(__dirname, 'src/pages/customer.html'),
        technician: resolve(__dirname, 'src/pages/technician.html')
      }
    }
  }
});
