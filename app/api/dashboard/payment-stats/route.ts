import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, Project, RecurringSubscription } from "@/lib/db";

type PopulatedRef = { _id: mongoose.Types.ObjectId; name?: string };

type SubDoc = {
  _id: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId | PopulatedRef;
  projectId: mongoose.Types.ObjectId | PopulatedRef;
  productName?: string;
  amount?: number;
  interval?: string;
  status: string;
};

type ProjectDoc = {
  _id: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId | PopulatedRef;
  name: string;
  oneTimeCost?: number;
  paymentStatus?: string;
};

function getIdAndName(ref: mongoose.Types.ObjectId | PopulatedRef | null): { id: string; name: string } {
  if (!ref) return { id: "", name: "Unknown" };
  const id = typeof ref === "object" && "_id" in ref ? String(ref._id) : String(ref);
  const name = typeof ref === "object" && ref !== null && "name" in ref ? (ref.name ?? "Unknown") : "Unknown";
  return { id, name };
}

export async function GET() {
  try {
    await connectDB();

    const [lateSubs, pendingSubs, unpaidProjects] = await Promise.all([
      RecurringSubscription.find({ status: "past_due" })
        .populate("customerId", "name")
        .populate("projectId", "name")
        .lean(),
      RecurringSubscription.find({ status: "incomplete" })
        .populate("customerId", "name")
        .populate("projectId", "name")
        .lean(),
      Project.find({
        paymentStatus: { $in: ["unpaid", "partially_paid"] },
        status: { $ne: "complete" },
      })
        .populate("customerId", "name")
        .lean(),
    ]);

    const toSubItem = (sub: SubDoc) => {
      const cust = getIdAndName(sub.customerId);
      const proj = getIdAndName(sub.projectId);
      return {
        id: String(sub._id),
        customerId: cust.id,
        customerName: cust.name,
        projectId: proj.id,
        projectName: proj.name,
        productName: sub.productName ?? "Subscription",
        amount: sub.amount,
        interval: sub.interval,
        status: sub.status,
      };
    };

    const toProjectItem = (p: ProjectDoc) => {
      const cust = getIdAndName(p.customerId);
      return {
        id: String(p._id),
        customerId: cust.id,
        customerName: cust.name,
        projectName: p.name,
        oneTimeCost: p.oneTimeCost,
        paymentStatus: p.paymentStatus ?? "unpaid",
      };
    };

    return NextResponse.json({
      lateSubscriptions: (lateSubs as unknown as SubDoc[]).map(toSubItem),
      pendingSubscriptions: (pendingSubs as unknown as SubDoc[]).map(toSubItem),
      unpaidProjects: (unpaidProjects as unknown as ProjectDoc[]).map(toProjectItem),
    });
  } catch (error) {
    console.error("Payment stats error:", error);
    return NextResponse.json({ error: "Failed to fetch payment stats" }, { status: 500 });
  }
}
