import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    target: 'es2020',
    format: 'esm',
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
    ],
    exclude: [],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/ui': resolve(__dirname, './src/components/ui'),
      '@/layout': resolve(__dirname, './src/components/layout'),
      '@/layouts': resolve(__dirname, './src/layouts'),
      '@/sections': resolve(__dirname, './src/components/sections'),
      '@/forms': resolve(__dirname, './src/components/forms'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/lib': resolve(__dirname, './src/lib'),
      '@/types': resolve(__dirname, './src/types'),
      '@/utils': resolve(__dirname, './src/utils'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
        },
      },
    },
    target: 'es2020',
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,
  },
  server: {
    port: 3000,
    open: false,
    hmr: {
      overlay: false,
    },
  },
  preview: {
    port: 4173,
  },
});
