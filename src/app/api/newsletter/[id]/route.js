import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/models/newsletter';
import { requireAuth } from '@/lib/apiAuth';


// 📌 GET → Single User
export async function GET(req, context) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX

    const user = await Newsletter.findById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}


// 📌 DELETE → Remove Email
export async function DELETE(req, context) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX

    const deleted = await Newsletter.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Deleted successfully',
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}