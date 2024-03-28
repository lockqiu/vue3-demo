import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
   server: {
    host: '0.0.0.0', // 允许其他设备通过局域网 IP 访问
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@view': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@conf': fileURLToPath(new URL('./src/utils/@conf', import.meta.url)),
      '@static': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@comp': fileURLToPath(new URL('./src/components', import.meta.url))
    }
  }
})
