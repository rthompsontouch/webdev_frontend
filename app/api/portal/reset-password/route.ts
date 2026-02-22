import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, Customer } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { customerId, currentPassword, newPassword } = body as {
      customerId?: string;
      currentPassword?: string;
      newPassword?: string;
    };

    if (!customerId || !currentPassword || !newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const customer = await Customer.findById(customerId)
      .select("+passwordHash")
      .lean() as { passwordHash?: string } | null;

    if (!customer?.passwordHash) {
      return NextResponse.json(
        { error: "Account not set up for password reset" },
        { status: 400 }
      );
    }

    const valid = await verifyPassword(currentPassword, customer.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }

    const passwordHash = await hashPassword(newPassword);

    await Customer.updateOne(
      { _id: customerId },
      { $set: { passwordHash } }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
