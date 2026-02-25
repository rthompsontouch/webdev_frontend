import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, Project } from "@/lib/db";
import type { ProjectStatus, PaymentStatus } from "@/lib/types/dashboard";

function toProjectDoc(doc: {
  _id: unknown;
  customerId: unknown;
  type: string;
  name: string;
  status: string;
  oneTimeCost?: number;
  paymentStatus?: string;
  manualPayments?: { _id: unknown; amount: number; date: Date; method?: string; notes?: string }[];
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: String(doc._id),
    customerId: typeof doc.customerId === "object" && doc.customerId !== null && "toString" in doc.customerId
      ? (doc.customerId as { toString: () => string }).toString()
      : String(doc.customerId),
    type: doc.type,
    name: doc.name,
    status: doc.status,
    oneTimeCost: doc.oneTimeCost ?? 0,
    paymentStatus: (doc.paymentStatus as PaymentStatus) ?? "unpaid",
    manualPayments: (doc.manualPayments ?? []).map((p) => ({
      id: String(p._id),
      amount: p.amount,
      date: p.date?.toISOString?.() ?? new Date().toISOString(),
      method: p.method,
      notes: p.notes,
    })),
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
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    const project = await Project.findById(id).lean();
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(toProjectDoc(project as unknown as Parameters<typeof toProjectDoc>[0]));
  } catch (error) {
    console.error("Project GET error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
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
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    const body = await request.json();
    const {
      status,
      oneTimeCost,
      paymentStatus,
      manualPayment,
    } = body as {
      status?: ProjectStatus;
      oneTimeCost?: number;
      paymentStatus?: PaymentStatus;
      manualPayment?: { amount: number; date?: string; method?: string; notes?: string };
    };

    const update: Record<string, unknown> = {};
    if (status && ["discovery", "design", "development", "review", "launch", "complete"].includes(status)) {
      update.status = status;
    }
    if (typeof oneTimeCost === "number" && oneTimeCost >= 0) {
      update.oneTimeCost = oneTimeCost;
    }
    if (paymentStatus && ["unpaid", "partially_paid", "paid"].includes(paymentStatus)) {
      update.paymentStatus = paymentStatus;
    }

    let project;
    if (manualPayment && typeof manualPayment.amount === "number" && manualPayment.amount > 0) {
      const paymentDoc = {
        amount: manualPayment.amount,
        date: manualPayment.date ? new Date(manualPayment.date) : new Date(),
        method: manualPayment.method ?? "other",
        notes: manualPayment.notes,
      };
      project = await Project.findByIdAndUpdate(
        id,
        { $push: { manualPayments: paymentDoc }, ...update },
        { new: true }
      ).lean();
    } else {
      project = await Project.findByIdAndUpdate(
        id,
        Object.keys(update).length ? update : { $set: { updatedAt: new Date() } },
        { new: true }
      ).lean();
    }
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(toProjectDoc(project as unknown as Parameters<typeof toProjectDoc>[0]));
  } catch (error) {
    console.error("Project PATCH error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}
