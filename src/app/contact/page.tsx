import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { Eclipse } from "@/components/ui/Eclipse";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with BLXCK Marketing. Send a message or book a call — Edmonton-based, working with growing brands globally.",
  openGraph: {
    title: `Contact — ${site.name}`,
    description: "Send a message or book a call with BLXCK Marketing.",
  },
};

const nextSteps = [
  {
    n: "01",
    title: "We read it properly",
    copy: "A strategist — not a bot — reviews your message and looks at your brand before replying.",
  },
  {
    n: "02",
    title: "You hear back within a day",
    copy: "A clear reply within one business day, with honest thoughts on where to start.",
  },
  {
    n: "03",
    title: "A focused first call",
    copy: "If it's a fit, we book a short call to map goals, timeline, and budget — no hard sell.",
  },
];

const details = [
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: "Phone", value: site.contact.phoneDisplay, href: `tel:${site.contact.phone}` },
  { label: "Studio", value: site.contact.address },
];

export default function ContactPage() {
  return (
    <>
      {/* ---------------- Intro ---------------- */}
      <section className="relative overflow-hidden pt-32 pb-14 md:pt-40">
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
              business day with a clear next step.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Form / what happens next ---------------- */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-(--spacing-gutter) lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left: form */}
          <Reveal>
            <h2 className="mb-6 text-2xl text-hi">
              Send a message
            </h2>
            <ContactForm />
          </Reveal>

          {/* Right: what happens next + details */}
          <Reveal delay={0.1}>
            <aside
              className="section-accent flex flex-col gap-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-ink p-7 md:p-9"
              style={{ ["--ac" as string]: "var(--color-teal)" }}
            >
              <h2 className="text-2xl text-hi">
                What happens next
              </h2>

              <ol className="flex flex-col gap-6">
                {nextSteps.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="section-chip shrink-0">{s.n}</span>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-hi">{s.title}</span>
                      <span className="text-sm leading-relaxed text-mid">{s.copy}</span>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="flex flex-col gap-4 border-t border-white/[0.08] pt-7">
                {details.map((d) => (
                  <div key={d.label} className="flex items-baseline justify-between gap-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-lo">
                      {d.label}
                    </span>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="text-right text-sm text-mid transition-colors hover:text-teal"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <span className="text-right text-sm text-mid">{d.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <a
                href={site.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/[0.1] px-5 py-4 text-sm transition-colors hover:border-teal/50 hover:bg-white/[0.02]"
              >
                <span className="flex flex-col gap-0.5">
                  <span className="font-semibold text-hi">Prefer to talk first?</span>
                  <span className="text-mid">Book a call at a time that suits you.</span>
                </span>
                <span className="text-teal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
