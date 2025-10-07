import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: './',
  server: {
    port: 5173,
    open: '/src/pages/dashboard.html'
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'src/pages/home.html'),
        dashboard: resolve(__dirname, 'src/pages/dashboard.html'),
        login: resolve(__dirname, 'src/pages/login.html'),
        customer: resolve(__dirname, 'src/pages/customer.html'),
        technician: resolve(__dirname, 'src/pages/technician.html'),
        projects: resolve(__dirname, 'src/pages/projects.html'),
        projectsReports: resolve(__dirname, 'src/pages/projects-reports.html'),
        projectsExpenses: resolve(__dirname, 'src/pages/projects-expenses.html'),
        users: resolve(__dirname, 'src/pages/users.html')
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});
