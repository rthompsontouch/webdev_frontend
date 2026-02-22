import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, Customer } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { token, password } = body as { token?: string; password?: string };

    if (!token || !password || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const customer = await Customer.findOne({
      inviteToken: token,
      inviteTokenExpiry: { $gt: new Date() },
    })
      .select("_id")
      .lean() as { _id: unknown } | null;

    if (!customer) {
      return NextResponse.json(
        { error: "Invite link expired or invalid" },
        { status: 404 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Use native MongoDB driver - Mongoose may strip passwordHash (select: false) during updates
    const conn = await connectDB();
    const db = conn.connection.db!;
    const result = await db.collection("customers").updateOne(
      { _id: new mongoose.Types.ObjectId(String(customer._id)) },
      {
        $set: {
          passwordHash,
          inviteToken: null,
          inviteTokenExpiry: null,
          inviteStatus: "signed_up",
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Invite link expired or invalid" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      customerId: String(customer._id),
    });
  } catch (error) {
    console.error("Set password error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
