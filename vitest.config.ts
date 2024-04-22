/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
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
