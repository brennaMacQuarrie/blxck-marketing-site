import { Resend } from "resend";
import { site } from "@/lib/site";

/**
 * Contact form handler → sends an email via Resend to the BLXCK inbox.
 * Requires RESEND_API_KEY. Until a domain is verified in Resend, set
 * CONTACT_FROM to a verified sender (defaults to Resend's test sender).
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const resend = new Resend(apiKey);
    const from = process.env.CONTACT_FROM || "BLXCK Website <onboarding@resend.dev>";
    const subject = `New enquiry — ${name}${company ? ` · ${company}` : ""}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "—"}`,
      `Interested in: ${interest || "—"}`,
      "",
      message,
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
