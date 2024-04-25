import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Federation from '@originjs/vite-plugin-federation'
'./node_modules/lodash'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  Federation({
    name: 'my-app-one',
    filename: 'remoteEntry.js',
    exposes: {
      './lodash': './src/exposes/exposeLodash.js',
      './moment': './src/exposes/exposeMoment.js',
    },
    shared: {
      react: {
        singleton: true,
        requiredVersion: 'deps.react', // Ensure this matches the version in package.json
      },
      'react-dom': {
        singleton: true,
        requiredVersion: 'deps["react-dom"]', // Ensure this matches the version in package.json
      },
      // ... any other shared dependencies
    }
  })
  ],
  build: {
    target: 'esnext',
    sourcemap: true
  }
})

