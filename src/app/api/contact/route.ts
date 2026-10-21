import { site } from "@/lib/site";
import { sendEmail } from "@/lib/email";

/**
 * Contact form handler → sends an email via SendGrid to the BLXCK inbox.
 * Requires SENDGRID_API_KEY and CONTACT_FROM (a SendGrid-verified sender).
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
  const company = String(data.company ?? "").trim();
  const interest = String(data.interest ?? "").trim();
  const message = String(data.message ?? "").trim();
  // Honeypot — bots fill this hidden field; humans never see it.
  const trap = String(data.website ?? "").trim();

  if (trap) return Response.json({ ok: true }); // silently drop bots
  if (!name || !email || !message) {
    return Response.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const subject = `New enquiry — ${name}${company ? ` · ${company}` : ""}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "—"}`,
    `Interested in: ${interest || "—"}`,
    "",
    message,
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
