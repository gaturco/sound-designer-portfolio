import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import path from "path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.join(
        __dirname,
        "../..",
        "client",
        "index.html"
      );

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html; charset=utf-8" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // Try multiple possible paths
  const possiblePaths = [
    path.join(process.cwd(), "dist", "public"),
    path.join(__dirname, "..", "..", "dist", "public"),
  ];

  let distPath = "";
  for (const p of possiblePaths) {
    console.log(`Checking path: ${p}`);
    if (fs.existsSync(p)) {
      console.log(`✅ Found dist at: ${p}`);
      distPath = p;
      break;
    } else {
      console.log(`❌ Not found: ${p}`);
    }
  }

  if (!distPath) {
    console.error(
      `Could not find dist/public in any location. Tried: ${possiblePaths.join(", ")}`
    );
    // Fallback
    distPath = possiblePaths[0];
  }

  console.log(`📁 Serving static files from: ${distPath}`);
  console.log(`   Directory exists: ${fs.existsSync(distPath)}`);
  
  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath);
    console.log(`   Files in directory: ${files.slice(0, 5).join(", ")}...`);
  }

  // Serve static assets with proper caching
  app.use(express.static(distPath, {
    maxAge: "1d",
    etag: false,
    setHeaders: (res, path) => {
      if (path.endsWith(".html")) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      } else if (path.match(/\.(js|css)$/)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    }
  }));

  // Fallback to index.html for SPA routing
  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    console.log(`📍 Request to: ${req.originalUrl}`);
    console.log(`   Looking for index.html at: ${indexPath}`);
    console.log(`   Exists: ${fs.existsSync(indexPath)}`);
    if (fs.existsSync(indexPath)) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      res.sendFile(indexPath);
    } else {
      console.error(`❌ index.html not found at ${indexPath}`);
      res.status(404).send("Not Found - index.html not found");
    }
  });
}
