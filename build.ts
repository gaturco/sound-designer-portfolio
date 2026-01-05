import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("🔨 Building frontend...");
execSync("vite build", { stdio: "inherit" });

console.log("📦 Copying server files...");
const distRoot = path.join(process.cwd(), "dist");

// Ensure dist exists
if (!fs.existsSync(distRoot)) {
  fs.mkdirSync(distRoot, { recursive: true });
}

// Copy server
const serverSrc = path.join(process.cwd(), "server");
const serverDest = path.join(distRoot, "server");
if (fs.existsSync(serverDest)) fs.rmSync(serverDest, { recursive: true });
fs.cpSync(serverSrc, serverDest, { recursive: true });
console.log("✅ Server copied");

// Copy shared
const sharedSrc = path.join(process.cwd(), "shared");
const sharedDest = path.join(distRoot, "shared");
if (fs.existsSync(sharedDest)) fs.rmSync(sharedDest, { recursive: true });
fs.cpSync(sharedSrc, sharedDest, { recursive: true });
console.log("✅ Shared copied");

// Copy drizzle
const drizzleSrc = path.join(process.cwd(), "drizzle");
const drizzleDest = path.join(distRoot, "drizzle");
if (fs.existsSync(drizzleDest)) fs.rmSync(drizzleDest, { recursive: true });
fs.cpSync(drizzleSrc, drizzleDest, { recursive: true });
console.log("✅ Drizzle copied");

console.log("✅ Build complete!");



