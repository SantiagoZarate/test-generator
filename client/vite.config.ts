/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import { VitePluginRadar } from 'vite-plugin-radar';

import { config } from 'dotenv';
const envPath = `.env.${process.env.NODE_ENV}`;
config({ path: envPath });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginRadar({
      enableDev: true,
      analytics: {
        id: process.env.VITE_GOOGLE_ANALYTIC_MEASUREMENT_ID!,
      },
    }),
  ],
  test: {
    environment: 'happy-dom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@backend': path.resolve(__dirname, '../server/src/types/'),
    },
  },
  server: {
    port: Number(process.env.PORT) || 4000,
    strictPort: true,
    proxy: {
      '/api': {
        target: process.env.VITE_TEST_API_URL,
        changeOrigin: true,
        secure: process.env.NODE_ENV === 'production',
        rewrite: (path) => {
          return path;
        },
      },
    },
  },
});
