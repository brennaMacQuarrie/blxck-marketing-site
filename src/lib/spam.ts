/**
 * Spam checks for the site's forms.
 *
 * 1. Heuristics that need no setup: the honeypot field, a minimum time on the
 *    page (bots post instantly, or skip the form and post to the API directly),
 *    and a cap on links in the message.
 * 2. Google reCAPTCHA v3 (invisible, score-based), on once these are set:
 *      NEXT_PUBLIC_RECAPTCHA_SITE_KEY — site key (used in the browser)
 *      RECAPTCHA_SECRET_KEY           — secret key (server only)
 */

const MIN_FILL_MS = 3000;
const MAX_LINKS = 2;
const MIN_SCORE = 0.5;

/** True when the submission looks automated. Bots get a fake success. */
export function looksAutomated(data: Record<string, unknown>, text: string): boolean {
  if (String(data.website ?? "").trim()) return true; // honeypot filled
  const started = Number(data.started);
  if (!Number.isFinite(started) || Date.now() - started < MIN_FILL_MS) return true;
  const links = text.match(/https?:\/\/|www\./gi)?.length ?? 0;
  return links > MAX_LINKS;
}

/** Verify a reCAPTCHA v3 token. Passes when reCAPTCHA isn't configured yet. */
export async function passesRecaptcha(token: unknown, action: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const r = (await res.json()) as { success?: boolean; score?: number; action?: string; "error-codes"?: string[] };
    if (!r.success || r.action !== action || (r.score ?? 0) < MIN_SCORE) {
      console.warn("reCAPTCHA rejected", { score: r.score, action: r.action, success: r.success, errors: r["error-codes"] });
      return false;
    }
    return true;
  } catch (e) {
    // If Google can't be reached, don't lose a real enquiry.
    console.error("reCAPTCHA verify failed", e);
    return true;
  }
}
