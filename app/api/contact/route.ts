import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { connectDB, Lead } from "@/lib/db";

const contactFormSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  interested: z.string().min(1),
  project: z.string().min(10),
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data." },
      { status: 400 }
    );
  }

  const { name, company, email, phone, interested, project } = parsed.data;

  try {
    await connectDB();
    await Lead.create({
      name,
      email,
      phone: phone || undefined,
      company,
      interested,
      project,
      status: "new",
    });
  } catch (dbError) {
    console.error("Failed to save lead:", dbError);
    return NextResponse.json(
      { error: "Failed to save your message. Please try again." },
      { status: 500 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();
  let fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  // Extract email from "Name <email>" format if present
  const fromAddr = (fromEmail.match(/<([^>]+)>/)?.[1] ?? fromEmail).toLowerCase();
  const toAddr = toEmail?.toLowerCase();
  // Avoid self-sending: many providers (Zoho, etc.) drop or filter emails sent to the same address
  if (toAddr && fromAddr === toAddr) {
    fromEmail = "TheWebPrism <onboarding@resend.dev>";
  }

  if (apiKey && toEmail) {
    const resend = new Resend(apiKey);
    const safe = {
      name: escapeHtml(name),
      company: escapeHtml(company),
      email: escapeHtml(email),
      interested: escapeHtml(interested),
      project: escapeHtml(project),
    };
    const adminHtml = `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${safe.name}</p>
      <p><strong>Company:</strong> ${safe.company}</p>
      <p><strong>Email:</strong> ${safe.email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      <p><strong>Interested In:</strong> ${safe.interested}</p>
      <p><strong>Project:</strong><br/>${safe.project.replace(/\n/g, "<br/>")}</p>
    `;
    const autoReplyHtml = `
      <p>Hi ${safe.name},</p>
      <p>Thanks for reaching out to TheWebPrism. We received your message and will get back to you soon.</p>
      <p>Summary:</p>
      <p><strong>Company:</strong> ${safe.company}</p>
      <p><strong>Interested In:</strong> ${safe.interested}</p>
      <p><strong>Project:</strong><br/>${safe.project.replace(/\n/g, "<br/>")}</p>
      <p>Talk soon,<br/>TheWebPrism</p>
    `;
    try {
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: email,
        subject: `New contact form submission from ${name}`,
        html: adminHtml,
      });
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "We received your message",
        html: autoReplyHtml,
      });
    } catch (emailError) {
      console.error("Failed to send contact form emails:", emailError);
    }
  }

  return NextResponse.json({ ok: true });
}
