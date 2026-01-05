import { execSync } from "child_process";

console.log("🔨 Building frontend...");
execSync("vite build", { stdio: "inherit" });

console.log("✅ Build complete!");

