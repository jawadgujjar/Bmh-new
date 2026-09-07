import dbConnect from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/apiAuth";

export async function POST(req) {
  try {
    await dbConnect();

    // Access rule:
    //  - If NO users exist yet, allow creating the very first admin (bootstrap).
    //  - Otherwise, only a logged-in admin can create new staff accounts.
    const userCount = await User.estimatedDocumentCount();
    if (userCount > 0) {
      const currentUser = getAuthUser(req);
      if (!currentUser || currentUser.role !== "admin") {
        return NextResponse.json(
          { error: "Only an admin can create accounts" },
          { status: 403 }
        );
      }
    }

    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // First-ever user is forced to admin; after that the role can be chosen.
    const safeRole = userCount === 0 ? "admin" : role || "admin";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: safeRole,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
