// vite.config.js
import { vitePlugin as remix } from "file:///C:/Users/%E6%82%B2%E4%BC%A4%E9%9D%92%E8%9B%99%E5%85%88%E7%94%9F/ookini-github/node_modules/@remix-run/dev/dist/index.js";
import path from "path";
import { defineConfig } from "file:///C:/Users/%E6%82%B2%E4%BC%A4%E9%9D%92%E8%9B%99%E5%85%88%E7%94%9F/ookini-github/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "C:\\Users\\\u60B2\u4F24\u9752\u86D9\u5148\u751F\\ookini-github";
var vite_config_default = defineConfig({
  plugins: [
    remix({
      //   serverModuleFormat: "cjs",
    })
  ],
  define: {
    "process.env": process.env
    // "process.env.API_URL": JSON.stringify(process.env.VITE_API_URL),
  },
  build: {
    rollupOptions: {
      //   output: {
      //     format: "commonjs", // 指定输出格式为 CommonJS
      //   },
    }
  },
  resolve: {
    alias: {
      // 设置别名
      "~": path.resolve(__vite_injected_original_dirname, "app")
      // 将 '@' 指向 'src' 目录
    }
  },
  css: {
    modules: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${"~/common/styles/global.scss"}";`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTYwQjJcdTRGMjRcdTk3NTJcdTg2RDlcdTUxNDhcdTc1MUZcXFxcb29raW5pLWdpdGh1YlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU2MEIyXHU0RjI0XHU5NzUyXHU4NkQ5XHU1MTQ4XHU3NTFGXFxcXG9va2luaS1naXRodWJcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNiU4MiVCMiVFNCVCQyVBNCVFOSU5RCU5MiVFOCU5QiU5OSVFNSU4NSU4OCVFNyU5NCU5Ri9vb2tpbmktZ2l0aHViL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgdml0ZVBsdWdpbiBhcyByZW1peCB9IGZyb20gXCJAcmVtaXgtcnVuL2RldlwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZW1peCh7XHJcbiAgICAgIC8vICAgc2VydmVyTW9kdWxlRm9ybWF0OiBcImNqc1wiLFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBkZWZpbmU6IHtcclxuICAgIFwicHJvY2Vzcy5lbnZcIjogcHJvY2Vzcy5lbnYsXHJcbiAgICAvLyBcInByb2Nlc3MuZW52LkFQSV9VUkxcIjogSlNPTi5zdHJpbmdpZnkocHJvY2Vzcy5lbnYuVklURV9BUElfVVJMKSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIC8vICAgb3V0cHV0OiB7XHJcbiAgICAgIC8vICAgICBmb3JtYXQ6IFwiY29tbW9uanNcIiwgLy8gXHU2MzA3XHU1QjlBXHU4RjkzXHU1MUZBXHU2ODNDXHU1RjBGXHU0RTNBIENvbW1vbkpTXHJcbiAgICAgIC8vICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAvLyBcdThCQkVcdTdGNkVcdTUyMkJcdTU0MERcclxuICAgICAgXCJ+XCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiYXBwXCIpLCAvLyBcdTVDMDYgJ0AnIFx1NjMwN1x1NTQxMSAnc3JjJyBcdTc2RUVcdTVGNTVcclxuICAgIH0sXHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIG1vZHVsZXM6IHRydWUsXHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIHNjc3M6IHtcclxuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIke1wifi9jb21tb24vc3R5bGVzL2dsb2JhbC5zY3NzXCJ9XCI7YCxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVUsU0FBUyxjQUFjLGFBQWE7QUFDclcsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBRjdCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQTtBQUFBLElBRU4sQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLGVBQWUsUUFBUTtBQUFBO0FBQUEsRUFFekI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUlmO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBO0FBQUEsTUFFTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUE7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxJQUNULHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQixZQUFZLDZCQUE2QjtBQUFBLE1BQzNEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
