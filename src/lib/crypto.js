import crypto from "crypto";

// Encrypts secrets (e.g. the stored Google refresh token) before they touch
// the database. Key is derived from NEXTAUTH_SECRET so no extra env var is
// needed; changing NEXTAUTH_SECRET invalidates previously stored ciphertext.
const ALGO = "aes-256-gcm";

let cachedKey = null;
function getKey() {
  if (cachedKey) return cachedKey;
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("NEXTAUTH_SECRET not defined");
  cachedKey = crypto.scryptSync(secret, "google-integration-salt", 32);
  return cachedKey;
}

export function encryptSecret(plainText) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(String(plainText), "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return [iv.toString("base64"), authTag.toString("base64"), encrypted.toString("base64")].join(".");
}

export function decryptSecret(payload) {
  const [ivB64, tagB64, dataB64] = String(payload).split(".");
  if (!ivB64 || !tagB64 || !dataB64) throw new Error("Malformed encrypted payload");
  const decipher = crypto.createDecipheriv(ALGO, getKey(), Buffer.from(ivB64, "base64"));
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}
