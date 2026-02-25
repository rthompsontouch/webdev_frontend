/**
 * Set the dashboard admin password. Hashes the password and saves it to the database.
 * Run: npm run hash-dashboard-password "your-secure-password"
 */

import "./load-env";
import mongoose from "mongoose";
import { hashPassword } from "../lib/auth/password";
import { Admin } from "../lib/db";

const rawUri = process.env.MONGODB_URI;
if (typeof rawUri !== "string" || !rawUri.trim()) {
  console.error("MONGODB_URI not set in .env.local");
  process.exit(1);
}
const uri: string = rawUri;

const ADMIN_EMAIL = "hello@thewebprism.com";

async function main(): Promise<void> {
  const rawPassword = process.argv[2];
  if (typeof rawPassword !== "string" || rawPassword.length < 8) {
    console.error('Usage: npm run hash-dashboard-password "your-password"');
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const password: string = rawPassword;

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const passwordHash = await hashPassword(password);

  // Remove old admin email if it existed
  await Admin.deleteOne({ email: "admin@thewebprism.com" });

  await Admin.findOneAndUpdate(
    { email: ADMIN_EMAIL },
    { $set: { email: ADMIN_EMAIL, name: "Admin", passwordHash } },
    { upsert: true, new: true }
  );

  console.log("\nDashboard password updated successfully.");
  console.log("You can now sign in with your new password.\n");

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
