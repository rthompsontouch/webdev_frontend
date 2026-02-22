import { NextResponse } from "next/server";
import type { ProjectUpdateFeedback } from "@/lib/types/dashboard";
import { mockFeedback } from "@/lib/mock/updates";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updateId = id;
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId");

  const feedback = customerId
    ? mockFeedback.find((f) => f.updateId === updateId && f.customerId === customerId)
    : mockFeedback.find((f) => f.updateId === updateId);
  return NextResponse.json(feedback ?? null);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updateId = id;
  const body = await request.json();
  const { customerId, liked, comment, viewed } = body as {
    customerId: string;
    liked?: boolean | null;
    comment?: string;
    viewed?: boolean;
  };

  if (!customerId) {
    return NextResponse.json({ error: "customerId required" }, { status: 400 });
  }

  let feedback = mockFeedback.find(
    (f) => f.updateId === updateId && f.customerId === customerId
  );

  if (!feedback) {
    feedback = {
      id: `fb-${Date.now()}`,
      updateId,
      customerId,
      liked: liked ?? null,
      comment,
      viewedAt: (viewed ?? true) ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString(),
    };
    mockFeedback.push(feedback);
  } else {
    if (liked !== undefined) feedback.liked = liked;
    if (comment !== undefined) feedback.comment = comment;
    if (viewed) feedback.viewedAt = feedback.viewedAt ?? new Date().toISOString();
  }

  return NextResponse.json(feedback);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updateId = id;
  let feedback = mockFeedback.find((f) => f.updateId === updateId);
  const body = await request.json();
  const { reply } = body as { reply?: string };

  if (!feedback) {
    feedback = {
      id: `fb-${Date.now()}`,
      updateId,
      liked: null,
      reply: reply ?? "",
      createdAt: new Date().toISOString(),
    };
    mockFeedback.push(feedback as ProjectUpdateFeedback);
  } else if (reply !== undefined) {
    feedback.reply = reply;
  }

  return NextResponse.json(feedback);
}
