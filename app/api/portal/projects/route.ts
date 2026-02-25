import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {
  connectDB,
  Project,
  ProjectUpdate,
  ProjectUpdateFeedback,
} from "@/lib/db";

function toProjectDoc(doc: {
  _id: unknown;
  customerId: unknown;
  type: string;
  name: string;
  status: string;
  oneTimeCost?: number;
  paymentStatus?: string;
  manualPayments?: { amount: number; date: Date; method?: string; notes?: string }[];
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: String(doc._id),
    customerId:
      typeof doc.customerId === "object" &&
      doc.customerId !== null &&
      "toString" in doc.customerId
        ? (doc.customerId as { toString: () => string }).toString()
        : String(doc.customerId),
    type: doc.type,
    name: doc.name,
    status: doc.status,
    oneTimeCost: doc.oneTimeCost ?? 0,
    paymentStatus: doc.paymentStatus ?? "unpaid",
    manualPayments: (doc.manualPayments ?? []).map((p) => ({
      amount: p.amount,
      date: p.date?.toISOString?.() ?? new Date().toISOString(),
      method: p.method,
      notes: p.notes,
    })),
    createdAt: doc.createdAt?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: doc.updatedAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
      return NextResponse.json(
        { error: "customerId required" },
        { status: 400 }
      );
    }

    const projects = await Project.find({
      customerId: new mongoose.Types.ObjectId(customerId),
    })
      .sort({ createdAt: -1 })
      .lean();

    const updates = await ProjectUpdate.find({
      projectId: { $in: projects.map((p) => p._id) },
    }).lean();

    const feedback = await ProjectUpdateFeedback.find({
      updateId: { $in: updates.map((u) => u._id) },
      customerId,
    }).lean();

    const feedbackByUpdate = new Map(
      feedback.map((f) => [String(f.updateId), f])
    );

    const unviewedByProject = new Map<string, number>();
    for (const u of updates) {
      const pid = String(u.projectId);
      const fb = feedbackByUpdate.get(String(u._id));
      const isViewed = fb?.viewedAt != null;
      if (!isViewed) {
        unviewedByProject.set(pid, (unviewedByProject.get(pid) ?? 0) + 1);
      }
    }

    return NextResponse.json(
      projects.map((p) => {
        const doc = toProjectDoc(p as unknown as Parameters<typeof toProjectDoc>[0]);
        return {
          ...doc,
          unviewedUpdatesCount: unviewedByProject.get(String(p._id)) ?? 0,
        };
      })
    );
  } catch (error) {
    console.error("Portal projects GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
