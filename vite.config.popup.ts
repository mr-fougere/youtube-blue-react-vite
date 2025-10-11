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
        popup: "popup.html",
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "assets/[name].[ext]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const packageName = id
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
            return `vendor/${packageName}`;
          }
        },
      },
    },
    outDir: "dist",
    chunkSizeWarningLimit: 200,
  },
});
