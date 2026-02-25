import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, Project } from "@/lib/db";

function toProjectDoc(doc: {
  _id: unknown;
  customerId: { toString: () => string };
  type: string;
  name: string;
  status: string;
  oneTimeCost?: number;
  paymentStatus?: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: String(doc._id),
    customerId: typeof doc.customerId === "object" && doc.customerId !== null && "toString" in doc.customerId
      ? doc.customerId.toString()
      : String(doc.customerId),
    type: doc.type,
    name: doc.name,
    status: doc.status,
    oneTimeCost: doc.oneTimeCost ?? 0,
    paymentStatus: doc.paymentStatus ?? "unpaid",
    createdAt: doc.createdAt?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: doc.updatedAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");

    const query = customerId && mongoose.Types.ObjectId.isValid(customerId)
      ? { customerId: new mongoose.Types.ObjectId(customerId) }
      : {};
    const projects = await Project.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      projects.map((p) => toProjectDoc(p as unknown as Parameters<typeof toProjectDoc>[0]))
    );
  } catch (error) {
    console.error("Projects GET error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { customerId, type, name } = body;
    if (!customerId || !type || !name) {
      return NextResponse.json({ error: "customerId, type, and name are required" }, { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return NextResponse.json({ error: "Invalid customerId" }, { status: 400 });
    }

    const project = await Project.create({
      customerId: new mongoose.Types.ObjectId(customerId),
      type,
      name,
      status: "discovery",
    });

    return NextResponse.json(toProjectDoc(project.toObject() as unknown as Parameters<typeof toProjectDoc>[0]));
  } catch (error) {
    console.error("Projects POST error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
