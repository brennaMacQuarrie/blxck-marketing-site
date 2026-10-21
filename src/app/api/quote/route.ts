import { site } from "@/lib/site";
import { sendEmail } from "@/lib/email";

/**
 * Plan builder quote → emails the full plan to the BLXCK inbox via SendGrid
 * (reply-to the customer). Responds 503 when SendGrid isn't configured so
 * the builder falls back to a prefilled email.
 */
export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const business = String(data.business ?? "").trim();
  const message = String(data.message ?? "").trim();
  const plan = String(data.plan ?? "").trim().slice(0, 20000);
  const trap = String(data.website ?? "").trim();

  if (trap) return Response.json({ ok: true });
  if (!name || !email || !plan) {
    return Response.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const subject = `Plan builder quote — ${name}${business ? ` · ${business}` : ""}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Business: ${business || "—"}`,
    ...(message ? ["", message] : []),
    "",
    "----------------------------------------",
    plan,
  ].join("\n");

  const result = await sendEmail({
    to: site.contact.email,
    replyTo: email,
    subject,
    text,
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, error: result.error },
      { status: result.error === "not_configured" ? 503 : 502 },
    );
  }
  return Response.json({ ok: true });
}
