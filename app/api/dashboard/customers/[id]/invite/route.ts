import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { Resend } from "resend";
import { connectDB, Customer } from "@/lib/db";
import mongoose from "mongoose";

// Use native MongoDB to persist token - Mongoose cached model may strip schema fields
async function saveInviteToken(
  customerId: string,
  token: string,
  expiresAt: Date
) {
  const conn = await connectDB();
  const db = conn.connection.db!;
  const result = await db
    .collection("customers")
    .updateOne(
      { _id: new mongoose.Types.ObjectId(customerId) },
      { $set: { inviteStatus: "invited", inviteToken: token, inviteTokenExpiry: expiresAt } }
    );
  return result;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service not configured. Add RESEND_API_KEY to .env.local" },
      { status: 500 }
    );
  }

  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const customer = await Customer.findById(id).lean();
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    if (customer.inviteStatus === "signed_up") {
      return NextResponse.json(
        { error: "Customer has already signed up" },
        { status: 400 }
      );
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const portalUrl = `${getBaseUrl()}/portal/invite?token=${token}`;
    const resend = new Resend(apiKey);

    const safeName = escapeHtml(customer.name);
    const safeEmail = escapeHtml(customer.email);
    const html = `
      <h2>You're invited to TheWebPrism Client Portal</h2>
      <p>Hi ${safeName},</p>
      <p>You've been invited to access your project dashboard at TheWebPrism. Click the button below to set your password and get started.</p>
      <p><a href="${portalUrl}" style="display:inline-block;background:#e11d48;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:600;">Set your password</a></p>
      <p>This link expires in 7 days. If you have any questions, just reply to this email.</p>
      <p>— TheWebPrism</p>
    `;

    const updateResult = await saveInviteToken(id, token, expiresAt);
    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: customer.email,
      subject: "You're invited to TheWebPrism Client Portal",
      html,
    });

    if (error) {
      console.error("Invite email error:", error);
      return NextResponse.json(
        { error: "Failed to send invite email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Invite error:", err);
    return NextResponse.json(
      { error: "Failed to send invite" },
      { status: 500 }
    );
  }
}
