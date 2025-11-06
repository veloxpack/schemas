import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'path'
import { statSync, readFileSync, watch } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
    // Serve schemas folder
    {
      name: 'serve-schemas',
      configureServer(server) {
        const schemasDir = resolve(dirname(fileURLToPath(import.meta.url)), '../schemas');

        server.middlewares.use((req, res, next) => {
          if (!req.url || req.url.startsWith('/@') || req.url === '/') {
            return next();
          }

          const urlPath = req.url.split('?')[0];
          const filePath = resolve(schemasDir, urlPath.slice(1));

          try {
            if (statSync(filePath).isFile()) {
              res.setHeader('Content-Type', 'application/json');
              res.end(readFileSync(filePath, 'utf-8'));
              return;
            }
          } catch {
            // File not found, continue to next middleware
          }
          next();
        });

        // Watch schemas folder for changes
        const watcher = watch(schemasDir, { recursive: true }, (_eventType, filename) => {
          if (filename) {
            server.ws.send({
              type: 'full-reload',
            });
          }
        });

        // Clean up watcher when server closes
        server.httpServer?.once('close', () => {
          watcher.close();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    fs: {
      // Allow serving files from the parent directory to access schemas
      allow: ['..'],
    },
  },
})
