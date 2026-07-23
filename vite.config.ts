import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) return 'firebase';
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) return 'react-vendor';
              if (id.includes('lucide-react')) return 'icons';
              if (id.includes('exceljs') || id.includes('jspdf') || id.includes('html2canvas')) return 'reports-vendor';
              if (id.includes('motion') || id.includes('framer-motion')) return 'motion';
              if (id.includes('@capacitor')) return 'capacitor';
              return 'vendor';
            }
          }
        }
      }
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
