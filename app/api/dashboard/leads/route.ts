import { NextResponse } from "next/server";
import { connectDB, Lead } from "@/lib/db";
import { toAPIArray } from "@/lib/db/utils";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const baseQuery: Record<string, unknown> = { status: { $ne: "converted" } };
    if (status && ["new", "contacted", "not_interested"].includes(status)) {
      baseQuery.status = status;
    }
    const leads = await Lead.find(baseQuery).sort({ createdAt: -1 }).lean();

    const result = leads.map((l) => ({
      id: String(l._id),
      name: l.name,
      email: l.email,
      phone: l.phone,
      company: l.company,
      interested: l.interested,
      project: l.project,
      status: l.status,
      notes: l.notes,
      createdAt: l.createdAt?.toISOString?.() ?? new Date().toISOString(),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Leads GET error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
