/// <reference types="vitest" />
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [viteCompression()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest-setup.ts"],
    alias: {
      "@src": "/src",
    },
    coverage: {
      reporter: ["text", "json", "html"],
    },
    css: true,
  },
});
