import { connectDB } from "./db";

export type InviteResult =
  | { ok: true; name: string; email: string }
  | { ok: false; error: string };

export async function validateInviteToken(token: string): Promise<InviteResult> {
  const trimmed = token?.trim();
  if (!trimmed) {
    return { ok: false, error: "Invalid invite link" };
  }

  const conn = await connectDB();
  const db = conn.connection.db!;
  const customers = db.collection("customers");

  const customer = (await customers.findOne(
    {
      inviteToken: trimmed,
      inviteTokenExpiry: { $gt: new Date() },
    },
    { projection: { name: 1, email: 1 } }
  )) as { name: string; email: string } | null;

  if (customer) {
    return { ok: true, name: customer.name, email: customer.email };
  }

  const expired = await customers.findOne(
    { inviteToken: trimmed },
    { projection: { _id: 1 } }
  );
  if (expired) {
    return { ok: false, error: "This invite link has expired. Please request a new one." };
  }

  return { ok: false, error: "Invite link not found. Please request a new invite from the dashboard." };
}
