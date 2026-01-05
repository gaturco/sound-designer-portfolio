import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("🔨 Building frontend...");
execSync("vite build", { stdio: "inherit" });

console.log("📦 Bundling server...");
const distDir = path.join(process.cwd(), "dist");

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy server directory to dist
const serverSrc = path.join(process.cwd(), "server");
const serverDest = path.join(distDir, "server");

if (fs.existsSync(serverDest)) {
  fs.rmSync(serverDest, { recursive: true });
}
fs.cpSync(serverSrc, serverDest, { recursive: true });

// Copy shared directory to dist
const sharedSrc = path.join(process.cwd(), "shared");
const sharedDest = path.join(distDir, "shared");

if (fs.existsSync(sharedDest)) {
  fs.rmSync(sharedDest, { recursive: true });
}
fs.cpSync(sharedSrc, sharedDest, { recursive: true });

// Copy drizzle directory to dist
const drizzleSrc = path.join(process.cwd(), "drizzle");
const drizzleDest = path.join(distDir, "drizzle");

if (fs.existsSync(drizzleDest)) {
  fs.rmSync(drizzleDest, { recursive: true });
}
fs.cpSync(drizzleSrc, drizzleDest, { recursive: true });

// Copy package.json for dependencies
fs.copyFileSync(
  path.join(process.cwd(), "package.json"),
  path.join(distDir, "package.json")
);

console.log("✅ Build complete!");
