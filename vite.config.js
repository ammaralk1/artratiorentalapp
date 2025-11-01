import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(async () => {
  const analyze = process.env.ANALYZE === 'true';
  /** @type {import('rollup').Plugin[]} */
  const rollupPlugins = [];

  if (analyze) {
    try {
      const { visualizer } = await import('rollup-plugin-visualizer');
      rollupPlugins.push(
        visualizer({
          filename: 'dist/stats.html',
          template: 'treemap',
          gzipSize: true,
          brotliSize: true,
          title: 'Bundle Visualizer'
        })
      );
    } catch (err) {
      // Plugin is optional; skip if not installed
      // eslint-disable-next-line no-console
      console.warn('[vite] Bundle analysis is enabled but rollup-plugin-visualizer is not installed.');
    }
  }

  return {
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
          users: resolve(__dirname, 'src/pages/users.html'),
          notifications: resolve(__dirname, 'src/pages/notifications.html')
        },
        output: {
          // Use content hashes to avoid stale cache issues in production
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
          manualChunks(id) {
            // Keep vendor separate for caching; allow Rollup to keep per-page entries distinct
            if (id.includes('node_modules')) return 'vendor';
            return undefined;
          }
        },
        plugins: rollupPlugins
      }
    }
  };
});
