/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

import { config } from 'dotenv';
config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
    proxy: {
      '/api': {
        target: process.env.VITE_TEST_API_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
