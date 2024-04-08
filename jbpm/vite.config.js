import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const proxyLog = (proxy) => {
  proxy.on('proxyReq', (proxyReq) => {
    proxyReq.method = 'GET';
    const { method, protocol, host, path } = proxyReq;
    console.log(`[proxy] ${method} ${protocol}//${host}${path}`);
  })}

// https://vitejs.dev/config/
export default defineConfig({
  origin: `*`,
  plugins: [react()],
  server: {
    host: `0.0.0.0`,
    proxy: {
      '/get': {
        target: `http://localhost:5173`,
        changeOrigin: true,
        
        rewrite: (path) => path.replace(/^\/get/, ''),
        configure: proxyLog,
      },
      
    },
  }
})
