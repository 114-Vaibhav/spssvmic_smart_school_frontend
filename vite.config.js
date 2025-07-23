import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      axios: path.resolve(__dirname, 'src/api.js'), // ✅ Correct alias
    },
  },
  server: {
    proxy: {
      '/api': 'https://spssvmicsmartschoolbackend-production.up.railway.app/', // ✅ Local dev proxy
    },
  },
});
