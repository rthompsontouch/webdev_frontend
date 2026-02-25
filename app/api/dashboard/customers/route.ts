import { NextResponse } from "next/server";
import { connectDB, Customer } from "@/lib/db";

function toCustomerDoc(doc: { _id: unknown; name: string; email: string; company?: string; phone?: string; notes?: string; inviteStatus?: string; stripeCustomerId?: string; createdAt: Date; updatedAt: Date }) {
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    company: doc.company,
    phone: doc.phone,
    notes: doc.notes,
    inviteStatus: doc.inviteStatus,
    stripeCustomerId: doc.stripeCustomerId,
    createdAt: doc.createdAt?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: doc.updatedAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { company: { $regex: search, $options: "i" } },
          ],
        }
      : {};
    const customers = await Customer.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      customers.map((c) => toCustomerDoc(c as unknown as Parameters<typeof toCustomerDoc>[0]))
    );
  } catch (error) {
    console.error("Customers GET error:", error);
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}
