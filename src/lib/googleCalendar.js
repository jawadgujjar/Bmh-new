import { google } from "googleapis";
import dbConnect from "@/lib/mongodb";
import GoogleIntegration from "@/models/googleIntegration";
import { decryptSecret, encryptSecret } from "@/lib/crypto";

const INTEGRATION_KEY = "calendar";

/**
 * Returns an authenticated google.calendar client backed by the single
 * admin refresh token stored in the DB. googleapis fetches a fresh access
 * token from the refresh token automatically on every call, so this keeps
 * working indefinitely without any visitor ever signing in with Google.
 *
 * Returns null if no admin has connected their Google account yet.
 */
export async function getCalendarClient() {
  await dbConnect();
  const doc = await GoogleIntegration.findOne({ key: INTEGRATION_KEY }).lean();
  if (!doc) return null;

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ refresh_token: decryptSecret(doc.refreshTokenEnc) });

  return google.calendar({ version: "v3", auth: oauth2Client });
}

export async function getConnectedAccount() {
  await dbConnect();
  const doc = await GoogleIntegration.findOne({ key: INTEGRATION_KEY }).lean();
  if (!doc) return null;
  return { email: doc.connectedEmail, connectedAt: doc.createdAt };
}

export async function saveConnectedAccount({ refreshToken, email, connectedBy }) {
  await dbConnect();
  await GoogleIntegration.findOneAndUpdate(
    { key: INTEGRATION_KEY },
    {
      key: INTEGRATION_KEY,
      refreshTokenEnc: encryptSecret(refreshToken),
      connectedEmail: email,
      connectedBy,
    },
    { upsert: true, new: true }
  );
}

export async function disconnectAccount() {
  await dbConnect();
  await GoogleIntegration.deleteOne({ key: INTEGRATION_KEY });
}
