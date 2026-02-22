import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, Lead } from "@/lib/db";
import type { LeadStatus } from "@/lib/types/dashboard";

function toLeadDoc(doc: { _id: unknown; name: string; email: string; phone?: string; company: string; interested: string; project: string; status: string; notes?: string; createdAt: Date }) {
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    company: doc.company,
    interested: doc.interested,
    project: doc.project,
    status: doc.status,
    notes: doc.notes,
    createdAt: doc.createdAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    const lead = await Lead.findById(id).lean();
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json(toLeadDoc(lead as Parameters<typeof toLeadDoc>[0]));
  } catch (error) {
    console.error("Lead GET error:", error);
    return NextResponse.json({ error: "Failed to fetch lead" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    const body = await request.json();
    const { status, notes } = body as { status?: LeadStatus; notes?: string };

    const update: Record<string, unknown> = {};
    if (status && ["new", "contacted", "converted", "not_interested"].includes(status)) {
      update.status = status;
    }
    if (notes !== undefined) update.notes = notes;

    const lead = await Lead.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json(toLeadDoc(lead as Parameters<typeof toLeadDoc>[0]));
  } catch (error) {
    console.error("Lead PATCH error:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
