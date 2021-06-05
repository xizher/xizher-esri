import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import visualizer from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 8082
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '~hooks': path.resolve(__dirname, 'src/hooks'),
      '~esri': path.resolve(__dirname, 'src/esri'),
      '~cp': path.resolve(__dirname, 'src/components'),
      '~services': path.resolve(__dirname, 'src/services'),
      '~views': path.resolve(__dirname, 'src/views'),
    },
  },
  plugins: [
    createVuePlugin(),
    viteCompression(),
    visualizer({ open: true }),
  ]
})
