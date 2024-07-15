import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
    
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'https://json.schemastore.org/prettierrc': path.resolve(__dirname, 'schemas/prettierrc.json'),
      'https://json.schemastore.org/jsconfig': path.resolve(__dirname, 'schemas/jsconfig.json'),
      // '@axiosInstance': path.resolve(__dirname, '/src/components/Auth/axiosInstance.js')
    },
  },
});
