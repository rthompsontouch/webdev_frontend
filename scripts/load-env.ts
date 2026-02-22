/**
 * Load .env.local before any other imports.
 * Import this first in scripts that run outside Next.js.
 */
import { config } from "dotenv";
config({ path: ".env.local" });
