import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  plugins: [react(), tailwindcss(), tsconfigPaths(), process.env.HTTPS && mkcert()],
  build: {
    target: 'esnext',
  },
  publicDir: './public',
  server: {
    allowedHosts: ['delightedly-original-shrike.cloudpub.ru'],
    host: true,
  },
});
