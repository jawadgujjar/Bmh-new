import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb'; // apna DB connection
import Newsletter from '@/models/newsletter';

// 📌 POST → Add Email
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // check duplicate
    const existing = await Newsletter.findOne({ email });

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Email already subscribed' },
        { status: 400 }
      );
    }

    const newUser = await Newsletter.create({ email });

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully',
      data: newUser,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


// 📌 GET → All Emails
export async function GET() {
  try {
    await connectDB();

    const users = await Newsletter.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: users,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}