import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        content: "src/scripts/content.ts",
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "assets/[name].[ext]",
        inlineDynamicImports: true,
      },
    },
    outDir: "dist",
    minify: false,
    chunkSizeWarningLimit: 200,
  },
});
