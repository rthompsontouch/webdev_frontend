import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {
  connectDB,
  Customer,
  Project,
  Document,
  RecurringSubscription,
  ProjectUpdate,
  ProjectUpdateFeedback,
} from "@/lib/db";

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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
    return NextResponse.json(toCustomerDoc(customer as unknown as Parameters<typeof toCustomerDoc>[0]));
  } catch (error) {
    console.error("Customer GET error:", error);
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 500 });
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
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    const body = await request.json();
    const { name, email, company, phone, notes, inviteStatus } = body;

    const update: Record<string, unknown> = {};
    if (name !== undefined) update.name = name;
    if (email !== undefined) update.email = email;
    if (company !== undefined) update.company = company;
    if (phone !== undefined) update.phone = phone;
    if (notes !== undefined) update.notes = notes;
    if (inviteStatus !== undefined && ["not_invited", "invited", "signed_up"].includes(inviteStatus)) {
      update.inviteStatus = inviteStatus;
    }

    const customer = await Customer.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    return NextResponse.json(toCustomerDoc(customer as unknown as Parameters<typeof toCustomerDoc>[0]));
  } catch (error) {
    console.error("Customer PATCH error:", error);
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const customerId = new mongoose.Types.ObjectId(id);

    // Get projects for this customer (needed for ProjectUpdate cascade)
    const projects = await Project.find({ customerId }).lean();
    const projectIds = projects.map((p) => p._id);

    // Cascade delete in order
    await RecurringSubscription.deleteMany({ customerId });
    await ProjectUpdateFeedback.deleteMany({ customerId: id });
    await ProjectUpdate.deleteMany({ projectId: { $in: projectIds } });
    await Document.deleteMany({ customerId });
    await Project.deleteMany({ customerId });
    const deleted = await Customer.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Customer DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
  }
}
