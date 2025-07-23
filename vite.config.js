

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    proxy: {
      '/api': 'https://spssvmicsmartschoolbackend-production.up.railway.app/',
    },
    alias: {
      axios: path.resolve(__dirname, 'src/api.js'), // 👈 Key line
    },
  },
});
