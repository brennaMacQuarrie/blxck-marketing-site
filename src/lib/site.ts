/**
 * Global site configuration — brand facts, contact details, nav, and the
 * env-driven integrations (Calendly, Resend). Single source of truth.
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
  // Set NEXT_PUBLIC_CALENDLY_URL in the environment to enable the embedded booker.
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/blxckmarketing/discovery",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;
