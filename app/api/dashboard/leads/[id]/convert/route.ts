import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, Lead, Customer } from "@/lib/db";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    const lead = await Lead.findById(id).lean() as { name: string; email: string; company?: string; phone?: string; notes?: string } | null;
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const customer = await Customer.create({
      name: lead.name,
      email: lead.email,
      company: lead.company,
      phone: lead.phone,
      notes: lead.notes,
      inviteStatus: "not_invited",
    });

    const deleted = await Lead.deleteOne({ _id: id });
    if (deleted.deletedCount === 0) {
      console.error("Lead delete failed - document not found:", id);
    }

    return NextResponse.json({ customerId: String(customer._id) });
  } catch (error) {
    console.error("Lead convert error:", error);
    return NextResponse.json({ error: "Failed to convert lead" }, { status: 500 });
  }
}
