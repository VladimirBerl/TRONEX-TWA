import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import tailwindcss from "@tailwindcss/vite";
import svgr from "@svgr/rollup";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  base: "/",
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    tsconfigPaths(),
    process.env.HTTPS && mkcert(),
    nodePolyfills(),
  ],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: [{ find: /^buffer$/, replacement: "buffer/" }],
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  build: {
    target: "esnext",
    rollupOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  server: {
    allowedHosts: [
      "delightedly-original-shrike.cloudpub.ru",
      "luckily-renewing-kookaburra.cloudpub.ru",
    ],
    host: true,
  },
});
