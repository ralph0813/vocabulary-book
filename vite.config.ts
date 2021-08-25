// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite'
// eslint-disable-next-line import/no-extraneous-dependencies
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
})
