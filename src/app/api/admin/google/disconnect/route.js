import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiAuth";
import { disconnectAccount } from "@/lib/googleCalendar";
import { safeError } from "@/lib/security";

export async function POST(req) {
  const auth = requireAuth(req, ["admin"]);
  if (!auth.ok) return auth.response;

  try {
    await disconnectAccount();
    return NextResponse.json({ success: true });
  } catch (err) {
    return safeError(err, { context: "google-disconnect" });
  }
}
