import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GetaQuote from "@/models/getaquote";

// POST - create new proposal
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // ✅ Ensure sourcePage is included
    const newQuote = await GetaQuote.create({
      firstName: body.firstName,
      lastName: body.lastName,
      phoneNumber: body.phoneNumber,
      emailAddress: body.emailAddress,
      websiteUrl: body.websiteUrl || "",
      monthlyBudget: body.monthlyBudget || 0,
      projectDetails: body.projectDetails,
      sourcePage: body.sourcePage || "", // add sourcePage
    });

    return NextResponse.json({ success: true, data: newQuote });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// GET - get all proposals
export async function GET() {
  try {
    await dbConnect();
    const quotes = await GetaQuote.find().sort({ createdAt: -1 });

    // ✅ Make sure sourcePage is returned
    return NextResponse.json({ success: true, data: quotes });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}