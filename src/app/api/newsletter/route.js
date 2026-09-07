import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb'; // apna DB connection
import Newsletter from '@/models/newsletter';
import { requireAuth } from '@/lib/apiAuth';
import { safeError, isEmail, cleanString, rateLimit } from '@/lib/security';

// 📌 POST → Add Email
export async function POST(req) {
  const limited = rateLimit(req, { name: 'newsletter', limit: 5, windowMs: 60_000 });
  if (!limited.ok) return limited.response;

  try {
    await connectDB();

    const body = await req.json();
    const email = cleanString(body.email, 254).toLowerCase();

    if (!email || !isEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
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

    await Newsletter.create({ email });

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully',
    });
  } catch (error) {
    return safeError(error, { context: 'newsletter.POST', key: 'message' });
  }
}


// 📌 GET → All Emails
export async function GET(req) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await connectDB();

    const users = await Newsletter.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    return safeError(error, { context: 'newsletter.GET', key: 'message' });
  }
}
