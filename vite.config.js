import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const root = resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"/NG-Calculator/",
  build:{
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        calculator: resolve(root, 'index.html')
      }
    }
  }
})
