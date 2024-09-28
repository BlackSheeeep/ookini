import { vitePlugin as remix } from "@remix-run/dev";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [remix()],
  build: {
    rollupOptions: {},
  },
  resolve: {
    alias: {
      // 设置别名
      "~": path.resolve(__dirname, "app"), // 将 '@' 指向 'src' 目录
    },
  },
  css: {
    modules: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${"~/common/styles/global.scss"}";`,
      },
    },
  },
});