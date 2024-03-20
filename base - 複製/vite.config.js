import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const proxyLog = (proxy) => {
  proxy.on('proxyReq', (proxyReq) => {
    const { method, protocol, host, path } = proxyReq
    console.log(`[proxy] ${method} ${protocol}//${host}${path}`)
  })}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: `0.0.0.0`,
    proxy: {
      '/gov': {
        target: 'https://quality.data.gov.tw',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gov/, ''),
        configure: proxyLog,
      },
      '/qas': {
        target: 'http://qascenter.asgard.com.tw:51000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/qas/, ''),
        configure: proxyLog,
      },
      '/api': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: proxyLog,
      },
      
    },
  }
})
