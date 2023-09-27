import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath} from 'url'

// https://vitejs.dev/config/
const defaultConfig = {
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
}
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    const isDev = mode === 'development'
    return {
      ...defaultConfig,
    server:{
      proxy: {
        '/api': {
          target: isDev ? 'http://localhost:3000' : 'https://goalcrushers.cyclic.cloud/',
          changeOrigin: isDev,
          secure: !isDev,
        }
      }
    }
    } 
  } else {
    return defaultConfig
  }
})
      


