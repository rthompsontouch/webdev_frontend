import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
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
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { error: "Email service not configured." },
      { status: 500 }
    );
  }

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

  const { name, company, email, interested, project } = parsed.data;
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
