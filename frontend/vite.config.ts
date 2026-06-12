import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](react|react-dom|react-router-dom|@tanstack\/react-query|react-hook-form)/,
              priority: 40,
            },
            {
              name: 'charts-vendor',
              test: /node_modules[\\/](recharts|d3-.*)/,
              priority: 30,
            },
            {
              name: 'motion-vendor',
              test: /node_modules[\\/]framer-motion/,
              priority: 20,
            },
            {
              name: 'icons-vendor',
              test: /node_modules[\\/]lucide-react/,
              priority: 10,
            }
          ]
        }
      }
    }
  }
})
