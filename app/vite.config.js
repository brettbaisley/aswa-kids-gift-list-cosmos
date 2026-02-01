import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json']
  },
  optimizeDeps: {
    entries: ['index.html']
  }
});
