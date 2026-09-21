import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiAuth";
import { getConnectedAccount } from "@/lib/googleCalendar";
import { safeError } from "@/lib/security";

export async function GET(req) {
  const auth = requireAuth(req, ["admin"]);
  if (!auth.ok) return auth.response;

  try {
    const account = await getConnectedAccount();
    return NextResponse.json({ connected: !!account, account });
  } catch (err) {
    return safeError(err, { context: "google-status" });
  }
}
