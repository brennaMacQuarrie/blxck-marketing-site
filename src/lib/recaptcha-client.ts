"use client";

/** Browser side of reCAPTCHA v3. Returns "" when no site key is set. */
export const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (key: string, opts: { action: string }) => Promise<string>;
};

export async function getRecaptchaToken(action: string): Promise<string> {
  if (!recaptchaSiteKey) return "";
  const g = (window as unknown as { grecaptcha?: Grecaptcha }).grecaptcha;
  if (!g) return "";
  return new Promise((resolve) => {
    g.ready(() => {
      g.execute(recaptchaSiteKey, { action }).then(resolve, () => resolve(""));
    });
  });
}
