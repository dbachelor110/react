import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const proxyGetLog = (proxy) => {
  proxy.on('proxyReq', (proxyReq) => {
    proxyReq.method = 'GET';
    const { method, protocol, host, path } = proxyReq;
    console.log(`[proxy] ${method} ${protocol}//${host}${path}`);
  })}
const proxyLog = (proxy) => {
  proxy.on('proxyReq', (proxyReq) => {
    // proxyReq.method = 'GET';
    const { method, protocol, host, path } = proxyReq;
    console.log(`[proxy] ${method} ${protocol}//${host}${path}`);
  })}
const targetByHostAndDoLog=(proxy,option)=>{
  proxy.on('proxyReq', (proxyReq) => {
    const { method, protocol, host, path } = proxyReq;
    option.target=`${protocol}//${host}`;
    console.log(`[proxy] ${method} ${protocol}//${host}${path}`);
  })
}

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
        configure: proxyGetLog,
      },
      '/jbpm': {
        target: `http://192.168.51.208:8086/kie-server/services/rest`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jbpm/, ''),
        configure: proxyLog,
      },
      '/api/': {
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\//, ''),
        configure: targetByHostAndDoLog,
      },
    },
  }
})
