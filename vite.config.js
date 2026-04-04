import { defineConfig } from 'vite';
import { resolve } from 'path';
import { Agent } from 'http';

function resolveApiProxyTarget() {
  const rawBase = process.env.VITE_API_BASE_URL || process.env.LOCAL_API_BASE_URL || 'http://127.0.0.1:8000/api';

  try {
    const parsed = new URL(rawBase);
    return {
      origin: parsed.origin,
      apiPath: (parsed.pathname || '/api').replace(/\/$/, '') || '/api',
    };
  } catch (_) {
    return {
      origin: 'http://127.0.0.1:8000',
      apiPath: '/api',
    };
  }
}

export default defineConfig(async () => {
  const analyze = process.env.ANALYZE === 'true';
  const apiProxy = resolveApiProxyTarget();
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
      open: '/src/pages/login.html',
      proxy: {
        // Proxy API calls to the local PHP dev server so cookies stay same-origin.
        // Start the PHP server with: npm run backoffice:local:api
        '/backend/api': {
          target: apiProxy.origin,
          rewrite: (path) => path.replace(/^\/backend\/api/, apiProxy.apiPath),
          changeOrigin: true,
          secure: false,
          // PHP built-in server sends Connection: close — disable keep-alive
          // so Node's http proxy does not attempt to reuse the connection.
          agent: new Agent({ keepAlive: false }),
          configure: (proxy) => {
            // Strip Content-Length from PHP responses — the built-in server
            // sometimes advertises a wrong length, causing ERR_CONTENT_LENGTH_MISMATCH
            // in the browser. Without it the browser uses chunked transfer safely.
            proxy.on('proxyRes', (proxyRes) => {
              delete proxyRes.headers['content-length'];
              proxyRes.on('error', () => {});
            });
            // Suppress ALL stream errors so PHP built-in server quirks
            // (Connection: close + extra data) never crash the Vite process.
            proxy.on('error', (err, req, res) => {
              console.warn('[proxy] error (suppressed):', err.message);
              try { req?.on('error', () => {}); } catch (_) {}
              try { res?.on('error', () => {}); } catch (_) {}
              try {
                if (res && !res.headersSent) {
                  res.writeHead(502, { 'Content-Type': 'application/json' });
                  res.end('{"error":"proxy error"}');
                } else {
                  res?.socket?.destroy();
                }
              } catch (_) {}
            });
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.on('error', () => {});
            });
          },
        },
      },
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
          notifications: resolve(__dirname, 'src/pages/notifications.html'),
          siteAnalytics: resolve(__dirname, 'src/pages/site-analytics.html'),
          contactInquiries: resolve(__dirname, 'src/pages/contact-inquiries.html'),
          feedbackSubmissions: resolve(__dirname, 'src/pages/feedback-submissions.html')
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
