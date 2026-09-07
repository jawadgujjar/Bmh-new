import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CallToActionQuote from "@/models/calltoactionquote";
import { requireAuth } from "@/lib/apiAuth";
import { safeError, isEmail, cleanString, rateLimit } from "@/lib/security";

// ✅ POST - Save new quote
export async function POST(req) {
  const limited = rateLimit(req, { name: "cta-quote", limit: 5, windowMs: 60_000 });
  if (!limited.ok) return limited.response;

  try {
    await dbConnect();
    const body = await req.json();

    const fullName = cleanString(body.fullName, 120);
    const emailAddress = cleanString(body.emailAddress, 254);
    const phoneNumber = cleanString(body.phoneNumber, 40);
    const goalsAndRequirements = cleanString(body.goalsAndRequirements, 5000);

    if (!fullName || !emailAddress || !phoneNumber || !goalsAndRequirements) {
      return NextResponse.json(
        { success: false, error: "Please fill all required fields" },
        { status: 400 }
      );
    }
    if (!isEmail(emailAddress)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const newQuote = await CallToActionQuote.create({
      fullName,
      emailAddress,
      phoneNumber,
      goalsAndRequirements,
    });

    return NextResponse.json(
      { success: true, data: { id: newQuote._id } },
      { status: 201 }
    );
  } catch (error) {
    return safeError(error, { context: "calltoactionquote.POST", status: 400 });
  }
}

// ✅ GET - Fetch all quotes
export async function GET(req) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await dbConnect();
    const quotes = await CallToActionQuote.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: quotes });
  } catch (error) {
    return safeError(error, { context: "calltoactionquote.GET" });
  }
}

// ✅ DELETE - Delete quote by id
export async function DELETE(req) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Quote ID is required" },
        { status: 400 }
      );
    }

    const deletedQuote = await CallToActionQuote.findByIdAndDelete(id);

    if (!deletedQuote) {
      return NextResponse.json(
        { success: false, error: "Quote not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Quote deleted successfully",
    });
  } catch (error) {
    return safeError(error, { context: "calltoactionquote.DELETE", status: 400 });
  }
}
