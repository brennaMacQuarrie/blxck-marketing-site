import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { Eclipse } from "@/components/ui/Eclipse";
import { ContactForm } from "@/components/contact/ContactForm";
import { CalendlyEmbed } from "@/components/contact/CalendlyEmbed";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with BLXCK Marketing. Send a message or book a call — Edmonton-based, working with growing brands globally.",
  openGraph: {
    title: `Contact — ${site.name}`,
    description: "Send a message or book a call with BLXCK Marketing.",
  },
};

const details = [
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: "Phone", value: site.contact.phoneDisplay, href: `tel:${site.contact.phone}` },
  { label: "Studio", value: site.contact.address },
];

export default function ContactPage() {
  return (
    <>
      {/* ---------------- Intro ---------------- */}
      <section className="relative overflow-hidden pt-28 pb-14 md:pt-36">
        <Eclipse
          color="teal"
          className="right-[-6%] top-[-16%] h-[52vmin] w-[52vmin] opacity-40"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-(--spacing-gutter)">
          <Reveal>
            <span className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-teal/60" />
              Contact
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-heading text-[clamp(2.4rem,6.5vw,5rem)] font-normal leading-[1.02] tracking-[-0.01em] text-hi">
              Let&apos;s make you{" "}
              <span className="text-spectrum">impossible to ignore.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mid">
              Tell us where you want to grow. We&apos;ll come back within one
              business day with a clear next step — no pressure, no jargon.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Form + details / Calendly ---------------- */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-(--spacing-gutter) lg:grid-cols-2 lg:gap-16">
          {/* Left: form + details */}
          <Reveal className="flex flex-col gap-10">
            <div>
              <h2 className="mb-6 text-xl font-semibold tracking-tight text-hi">
                Send a message
              </h2>
              <ContactForm />
            </div>

            <div className="grid gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-3">
              {details.map((d) => (
                <div key={d.label} className="flex flex-col gap-1.5">
                  <span className="text-xs uppercase tracking-[0.2em] text-lo">
                    {d.label}
                  </span>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="text-sm text-mid transition-colors hover:text-teal"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <span className="text-sm text-mid">{d.value}</span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: Calendly */}
          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div>
              <h2 className="mb-1.5 text-xl font-semibold tracking-tight text-hi">
                Prefer to book a call?
              </h2>
              <p className="text-sm text-mid">
                Grab a time that works — we&apos;ll come prepared.
              </p>
            </div>
            <CalendlyEmbed url={site.calendlyUrl} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
