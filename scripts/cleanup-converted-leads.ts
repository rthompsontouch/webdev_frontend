/**
 * Remove all converted leads from the database (one-time cleanup).
 * Run: npx tsx scripts/cleanup-converted-leads.ts
 */
import "./load-env";
import mongoose from "mongoose";
import { Lead } from "../lib/db";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not set");
  process.exit(1);
}

async function cleanup(uri: string) {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const result = await Lead.deleteMany({ status: "converted" });
  console.log(`Deleted ${result.deletedCount} converted lead(s)`);

  await mongoose.disconnect();
  process.exit(0);
}

cleanup(MONGODB_URI).catch((err) => {
  console.error(err);
  process.exit(1);
});
