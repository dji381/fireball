import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    glsl()
  ],
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src')
    }
  }
})
