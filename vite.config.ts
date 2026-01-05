import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];

export default defineConfig({
  base: "/",
  plugins,
  resolve: {
    alias: {
      "@": path.join(__dirname, "client", "src"),
      "@shared": path.join(__dirname, "shared"),
      "@assets": path.join(__dirname, "attached_assets"),
    },
  },
  envDir: __dirname,
  root: path.join(__dirname, "client"),
  publicDir: path.join(__dirname, "client", "public"),
  build: {
    outDir: path.join(__dirname, "dist", "public"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
