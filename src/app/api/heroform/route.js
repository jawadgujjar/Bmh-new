import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import HeroForm from "@/models/heroform";

// POST - create new form submission
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const newForm = await HeroForm.create(body);

    return NextResponse.json({
      success: true,
      data: newForm,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// GET - get all form submissions
export async function GET() {
  try {
    await dbConnect();

    const forms = await HeroForm.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: forms,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}