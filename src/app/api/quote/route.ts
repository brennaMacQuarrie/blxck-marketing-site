import { Resend } from "resend";
import { site } from "@/lib/site";

/**
 * Plan builder quote → emails the full plan to the BLXCK inbox via Resend
 * (reply-to the customer). Requires RESEND_API_KEY; responds 503 when it's
 * missing so the builder falls back to a prefilled email.
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const resend = new Resend(apiKey);
    const from = process.env.CONTACT_FROM || "BLXCK Website <onboarding@resend.dev>";
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

    const { error } = await resend.emails.send({
      from,
      to: site.contact.email,
      replyTo: email,
      subject,
      text,
    });
    if (error) {
      return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
