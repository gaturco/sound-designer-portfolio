import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";
import { serveStatic, setupVite } from "../server/_core/vite";

console.log("🚀 Vercel Serverless Function Starting...");
console.log("NODE_ENV:", process.env.NODE_ENV);

const app = express();

// Configure body parser with larger size limit for file uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// OAuth callback under /api/oauth/callback
registerOAuthRoutes(app);

// tRPC API
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Serve static files or Vite dev
if (process.env.NODE_ENV === "development") {
  console.log("📦 Using Vite dev server");
  setupVite(app, null as any).catch(console.error);
} else {
  console.log("📁 Serving static files from Vercel");
  serveStatic(app);
}

// Export for Vercel
export default app;
