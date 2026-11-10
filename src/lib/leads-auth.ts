// Server-only session helpers for the /leads client portal.
// A session is a signed token: `${expiry}.${HMAC_SHA256(LEADS_PASSWORD, "leads." + expiry)}`.
// Reusing LEADS_PASSWORD as the signing key means rotating the password invalidates old sessions.
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "leads_session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours (seconds)

function sign(exp: number): string {
  return createHmac("sha256", process.env.LEADS_PASSWORD || "").update(`leads.${exp}`).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a), bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function makeToken(): string {
  const exp = Date.now() + SESSION_MAX_AGE * 1000;
  return `${exp}.${sign(exp)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [expStr, mac] = token.split(".");
  const exp = Number(expStr);
  if (!exp || !mac || Date.now() > exp) return false;
  return safeEqual(mac, sign(exp));
}

export function checkPassword(input: string): boolean {
  const pw = process.env.LEADS_PASSWORD || "";
  return pw.length > 0 && safeEqual(input, pw);
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(SESSION_COOKIE)?.value);
}
