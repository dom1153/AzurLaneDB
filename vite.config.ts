import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "path"
import { splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  base: "/AzurLaneDB/",
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@": path.resolve(__dirname, "src"),
      "@src": path.resolve(__dirname, "src"),
    },
  },
})