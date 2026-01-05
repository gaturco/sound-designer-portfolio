import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("🔨 Building frontend...");
execSync("vite build", { stdio: "inherit" });

console.log("📦 Copying server files...");
const serverSrc = path.join(process.cwd(), "server");
const serverDest = path.join(process.cwd(), "dist", "server");

if (fs.existsSync(serverDest)) {
  fs.rmSync(serverDest, { recursive: true });
}
fs.cpSync(serverSrc, serverDest, { recursive: true });

// Copy shared
const sharedSrc = path.join(process.cwd(), "shared");
const sharedDest = path.join(process.cwd(), "dist", "shared");
if (fs.existsSync(sharedDest)) {
  fs.rmSync(sharedDest, { recursive: true });
}
fs.cpSync(sharedSrc, sharedDest, { recursive: true });

// Copy drizzle
const drizzleSrc = path.join(process.cwd(), "drizzle");
const drizzleDest = path.join(process.cwd(), "dist", "drizzle");
if (fs.existsSync(drizzleDest)) {
  fs.rmSync(drizzleDest, { recursive: true });
}
fs.cpSync(drizzleSrc, drizzleDest, { recursive: true });

console.log("✅ Build complete!");


