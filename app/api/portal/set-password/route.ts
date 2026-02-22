import { NextResponse } from "next/server";
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
    }).select("_id");

    if (!customer) {
      return NextResponse.json(
        { error: "Invite link expired or invalid" },
        { status: 404 }
      );
    }

    const passwordHash = await hashPassword(password);

    await Customer.findByIdAndUpdate(customer._id, {
      passwordHash,
      inviteToken: null,
      inviteTokenExpiry: null,
      inviteStatus: "signed_up",
    });

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
