import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root: '__tests__',
  server: {
    port: 8080,
    proxy: {
      '/sample-data': {
        target: 'http://localhost/arcgisjsapi/sample-data',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sample-data/, ''),
      },
    }
  },
  plugins: [
    vue(),
  ]
})
