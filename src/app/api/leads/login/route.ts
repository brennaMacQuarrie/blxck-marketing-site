import { NextResponse } from "next/server";
import { checkPassword, makeToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/leads-auth";

export async function POST(req: Request) {
  let password = "";
  try { password = String((await req.formData()).get("password") || ""); }
  catch { try { password = String(new URLSearchParams(await req.text()).get("password") || ""); } catch {} }

  if (!checkPassword(password)) return NextResponse.json({ ok: false }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
