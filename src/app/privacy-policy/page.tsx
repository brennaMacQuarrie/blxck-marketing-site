import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How BLXCK Marketing collects and uses information on blxckmarketing.com.",
  alternates: { canonical: "/privacy-policy" },
};

const sections: { h: string; p: React.ReactNode[] }[] = [
  {
    h: "Who we are",
    p: [
      <>
        {site.name} is a marketing agency based at {site.contact.address}. This policy covers
        blxckmarketing.com.
      </>,
    ],
  },
  {
    h: "What we collect",
    p: [
      "When you send us a message, we receive the name, email address, company and message you enter. We use it only to reply to you and to discuss working together.",
      "We use Google Tag Manager and Google Analytics to understand how people find and use the site, such as which pages are visited and roughly where visitors are from. These tools use cookies and do not tell us who you are.",
      "The contact form uses Google reCAPTCHA to block spam. reCAPTCHA collects information about your device and how you use the page, under Google's Privacy Policy and Terms of Service.",
    ],
  },
  {
    h: "Who we share it with",
    p: [
      "We don't sell your information. Messages are delivered to our inbox by our email provider, and the site is hosted by Vercel. Analytics data is processed by Google. Each of these services handles the data under its own privacy policy.",
    ],
  },
  {
    h: "How long we keep it",
    p: [
      "We keep enquiries for as long as we need them to work with you or answer your questions, and delete them when they're no longer needed.",
    ],
  },
  {
    h: "Your choices",
    p: [
      "You can block or delete cookies in your browser settings, and the site will still work.",
      <>
        To see, correct or delete the information we hold about you, email{" "}
        <a href={`mailto:${site.contact.email}`} className="text-hi underline underline-offset-4">
          {site.contact.email}
        </a>
        .
      </>,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40">
      <div className="mx-auto w-full max-w-3xl px-(--spacing-gutter)">
        <h1 className="font-heading text-[clamp(2.4rem,7vw,4.5rem)] font-normal leading-[1] text-hi">
          Privacy policy.
        </h1>
        <p className="mt-4 text-sm text-lo">Last updated November 2026</p>
        <div className="mt-12 flex flex-col gap-10">
          {sections.map((s) => (
            <div key={s.h} className="flex flex-col gap-3">
              <h2 className="text-2xl text-hi">{s.h}</h2>
              {s.p.map((t, i) => (
                <p key={i} className="leading-relaxed text-mid">
                  {t}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
