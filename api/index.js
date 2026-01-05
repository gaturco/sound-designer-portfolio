import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import and start the server
const { startServer } = await import("../dist/index.js");

// The server will start when this module is imported
