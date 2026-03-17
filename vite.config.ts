import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Increase limit to 1000kB to silence the warning
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split vendor code (node_modules) into a separate chunk for better caching
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react', 'recharts'],
        },
      },
    },
  },
});