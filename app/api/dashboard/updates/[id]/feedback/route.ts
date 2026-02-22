import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, ProjectUpdateFeedback } from "@/lib/db";

function toFeedbackDoc(doc: { _id: unknown; updateId: unknown; customerId?: string; liked: boolean | null; comment?: string; reply?: string; viewedAt?: Date; createdAt: Date }) {
  return {
    id: String(doc._id),
    updateId: typeof doc.updateId === "object" && doc.updateId !== null && "toString" in doc.updateId
      ? (doc.updateId as { toString: () => string }).toString()
      : String(doc.updateId),
    customerId: doc.customerId,
    liked: doc.liked,
    comment: doc.comment,
    reply: doc.reply,
    viewedAt: doc.viewedAt?.toISOString?.() ?? undefined,
    createdAt: doc.createdAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(null);
    }

    const query = customerId
      ? { updateId: new mongoose.Types.ObjectId(id), customerId }
      : { updateId: new mongoose.Types.ObjectId(id) };
    const feedback = await ProjectUpdateFeedback.findOne(query).lean();

    if (!feedback) return NextResponse.json(null);
    return NextResponse.json(toFeedbackDoc(feedback as Parameters<typeof toFeedbackDoc>[0]));
  } catch (error) {
    console.error("Feedback GET error:", error);
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { customerId, liked, comment, viewed } = body;

    if (!customerId) {
      return NextResponse.json({ error: "customerId required" }, { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid update" }, { status: 400 });
    }

    let feedback = await ProjectUpdateFeedback.findOne({
      updateId: new mongoose.Types.ObjectId(id),
      customerId,
    });

    if (!feedback) {
      feedback = await ProjectUpdateFeedback.create({
        updateId: new mongoose.Types.ObjectId(id),
        customerId,
        liked: liked ?? null,
        comment,
        viewedAt: viewed ?? true ? new Date() : undefined,
      });
    } else {
      if (liked !== undefined) feedback.liked = liked;
      if (comment !== undefined) feedback.comment = comment;
      if (viewed) feedback.viewedAt = feedback.viewedAt ?? new Date();
      await feedback.save();
    }

    return NextResponse.json(toFeedbackDoc(feedback.toObject() as Parameters<typeof toFeedbackDoc>[0]));
  } catch (error) {
    console.error("Feedback POST error:", error);
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { reply } = body as { reply?: string };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Update not found" }, { status: 404 });
    }

    let feedback = await ProjectUpdateFeedback.findOne({
      updateId: new mongoose.Types.ObjectId(id),
    });

    if (!feedback) {
      feedback = await ProjectUpdateFeedback.create({
        updateId: new mongoose.Types.ObjectId(id),
        customerId: "",
        liked: null,
        reply: reply ?? "",
      });
    } else if (reply !== undefined) {
      feedback.reply = reply;
      await feedback.save();
    }

    return NextResponse.json(toFeedbackDoc(feedback.toObject() as Parameters<typeof toFeedbackDoc>[0]));
  } catch (error) {
    console.error("Feedback PATCH error:", error);
    return NextResponse.json({ error: "Failed to update feedback" }, { status: 500 });
  }
}
