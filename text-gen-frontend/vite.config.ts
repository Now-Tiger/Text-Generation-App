import path from "path"
import { resolve } from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        generate: resolve(__dirname, 'src', 'playground/index.html')
      }
    }
  }
})