/**
 * Transactional email via SendGrid's v3 API (no SDK needed).
 *
 * Env:
 *   SENDGRID_API_KEY — API key with "Mail Send" permission.
 *   SENDGRID_FROM_EMAIL (or CONTACT_FROM) — a sender verified in SendGrid,
 *                      e.g. "BLXCK Website <info@blxckmarketing.com>".
 *   CONTACT_TO_EMAIL — optional inbox for enquiries; defaults to site.contact.email.
 */
export type SendResult = { ok: true } | { ok: false; error: "not_configured" | "send_failed" };

function parseAddress(value: string): { email: string; name?: string } {
  const m = value.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  return m ? { name: m[1] || undefined, email: m[2] } : { email: value.trim() };
}

export async function sendEmail(msg: {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}): Promise<SendResult> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM_EMAIL || process.env.CONTACT_FROM;
  if (!apiKey || !from) return { ok: false, error: "not_configured" };

  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: msg.to }] }],
        from: parseAddress(from),
        ...(msg.replyTo ? { reply_to: { email: msg.replyTo } } : {}),
        subject: msg.subject,
        content: [{ type: "text/plain", value: msg.text }],
      }),
    });
    // SendGrid returns 202 Accepted on success.
    if (!res.ok) console.error("SendGrid error", res.status, await res.text().catch(() => ""));
    return res.ok ? { ok: true } : { ok: false, error: "send_failed" };
  } catch {
    return { ok: false, error: "send_failed" };
  }
}

/** Where enquiries are delivered. */
export function enquiryInbox(fallback: string): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || fallback;
}
