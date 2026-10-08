/**
 * Global site configuration — brand facts, contact details, nav, and the
 * env-driven integrations (Calendly link, Resend). Single source of truth.
 */

export const site = {
  name: "BLXCK Marketing",
  shortName: "BLXCK",
  domain: "blxckmarketing.com",
  url: "https://blxckmarketing.com",
  tagline: "Make your business impossible to ignore.",
  description:
    "BLXCK Marketing is an Edmonton-based full-service agency — strategy, content, advertising, and web — built to make growing brands impossible to ignore.",
  location: "Edmonton, AB · Working globally",
  contact: {
    email: "info@blxckmarketing.com",
    phone: "+1-780-722-0646",
    phoneDisplay: "+1 (780) 722-0646",
    address: "11715H 108 Ave, Edmonton, AB, Canada",
  },
  social: {
    instagram: "https://instagram.com/blxckmarketing",
    linkedin: "https://linkedin.com/company/blxckmarketing",
  },
  // Booking link (opened in a new tab from /contact). Override with NEXT_PUBLIC_CALENDLY_URL.
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendly.com/blxckmarketing/blxck-meeting",
  // Estimate/quote calculator — set NEXT_PUBLIC_CALCULATOR_URL once live.
  calculatorUrl: process.env.NEXT_PUBLIC_CALCULATOR_URL ?? "/custom-plan-builder",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;
