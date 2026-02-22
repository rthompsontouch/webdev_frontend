/**
 * Verify Resend API key and email config.
 * Run: npm run resend:setup
 *
 * Add to .env.local:
 *   RESEND_API_KEY=re_xxxxx       (from https://resend.com/api-keys)
 *   CONTACT_TO_EMAIL=you@domain.com
 *   CONTACT_FROM_EMAIL=onboarding@resend.dev (or your verified domain)
 */
import "./load-env";
import { Resend } from "resend";

async function main() {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  console.log("\n--- Resend Email Setup ---\n");

  // Check env
  console.log("Environment:");
  console.log("  RESEND_API_KEY:", apiKey ? `${apiKey.slice(0, 10)}...` : "❌ NOT SET");
  console.log("  CONTACT_TO_EMAIL:", toEmail || "❌ NOT SET");
  console.log("  CONTACT_FROM_EMAIL:", fromEmail);
  console.log();

  if (!apiKey) {
    console.log("Add RESEND_API_KEY to .env.local");
    console.log("Get your key at: https://resend.com/api-keys");
    process.exit(1);
  }

  const resend = new Resend(apiKey);

  if (!toEmail) {
    console.log("Add CONTACT_TO_EMAIL to .env.local to verify the API key.");
    process.exit(0);
  }

  console.log("Sending test email to", toEmail, "...");
  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject: "TheWebPrism – Email test",
    html: "<p>Resend is configured correctly. Contact form and invite emails will work.</p>",
  });

  if (error) {
    console.error("❌ Test email failed:", error.message);
    console.log("  Check that CONTACT_FROM_EMAIL is verified in Resend.");
    process.exit(1);
  }

  console.log("✅ Test email sent (id:", data?.id, ")");

  console.log("\n--- Setup complete ---\n");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
