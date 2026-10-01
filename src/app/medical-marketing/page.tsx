import type { Metadata } from "next";
import Image from "next/image";
import { medical } from "@/lib/content";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eclipse } from "@/components/ui/Eclipse";

export const metadata: Metadata = {
  title: "Medical Marketing Solutions",
  description:
    "Compliance-aware marketing for medical and health practices — patient-acquisition ads, local SEO, websites, and reputation. More of the right patients, booked.",
  openGraph: {
    title: `Medical Marketing Solutions — ${site.name}`,
    description:
      "Marketing for clinics that want a fuller calendar. Compliance-aware ads, local SEO, websites, and reputation for medical practices.",
  },
};

export default function MedicalMarketingPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative flex min-h-[86svh] items-center overflow-hidden pt-16">
        <Eclipse
          color="teal"
          className="left-1/2 top-[-18%] h-[70vmin] w-[90vmin] -translate-x-1/2 opacity-50"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-veil opacity-[0.06]"
        />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-(--spacing-gutter) text-center">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)]" />
              {medical.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-7 font-body text-[clamp(2.3rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-hi">
              Marketing for clinics that want a{" "}
              <span className="text-spectrum">fuller calendar.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-mid">
              {medical.sub}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/contact" variant="primary" withArrow>
                Book a free clinic audit
              </ButtonLink>
              <ButtonLink href="#services" variant="ghost" withArrow={false}>
                What&apos;s included
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 text-xs uppercase tracking-[0.22em] text-lo">
              Trusted across optometry · aesthetics · mental health · specialty
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Problem ---------------- */}
      <section className="border-t border-white/[0.06] bg-void py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeading
            eyebrow="The problem"
            title="Great care doesn't market itself."
            lede="You're busy running a practice. Meanwhile the patients you should be seeing are being won — or lost — online, every day."
          />
          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2">
            {medical.problems.map((p) => (
              <RevealItem key={p.title} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/[0.08] bg-carbon/50 p-7">
                  <h3 className="text-lg font-semibold tracking-tight text-hi">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-mid">{p.copy}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- What we do ---------------- */}
      <section
        id="services"
        className="scroll-mt-24 border-t border-white/[0.06] bg-ink py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeading
            eyebrow="What we do for clinics"
            title="A complete growth system, tuned for healthcare."
          />
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {medical.services.map((s, i) => (
              <RevealItem key={s.title} className="h-full">
                <div className="flex h-full flex-col gap-3 bg-ink p-7">
                  <span className="text-xs tabular-nums text-lo">
                    0{i + 1}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-hi">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-mid">{s.copy}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- Proof / clients ---------------- */}
      <section className="border-t border-white/[0.06] bg-void py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeading
            eyebrow="Proof"
            title="We've already done this in healthcare."
            lede="A few of the practices and health brands we've helped grow."
          />
          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {medical.clients.map((c) => (
              <RevealItem key={c.name} className="h-full">
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08]">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={c.image}
                      alt={`${c.name} — ${c.sector} client of BLXCK Marketing`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <span className="font-heading text-lg text-hi">{c.name}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-mid">
                      {c.sector}
                    </span>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- Why BLXCK ---------------- */}
      <section className="border-t border-white/[0.06] bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeading
            eyebrow="Why BLXCK for medical"
            title="Built for a sensitive, high-trust category."
          />
          <RevealGroup className="mt-14 grid gap-10 sm:grid-cols-2">
            {medical.why.map((w, i) => (
              <RevealItem key={w.title}>
                <div className="flex gap-5">
                  <span className="font-heading text-xl text-teal tabular-nums">
                    0{i + 1}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold tracking-tight text-hi">
                      {w.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-mid">{w.copy}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="border-t border-white/[0.06] bg-void py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeading
            eyebrow="How it works"
            title="From first audit to a calendar that fills."
          />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
            {medical.steps.map((s) => (
              <RevealItem key={s.n} className="h-full">
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/[0.08] bg-carbon/50 p-7">
                  <span className="font-heading text-3xl text-teal">{s.n}</span>
                  <h3 className="text-lg font-semibold tracking-tight text-hi">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-mid">{s.copy}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="border-t border-white/[0.06] bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-(--spacing-gutter)">
          <Reveal className="relative overflow-hidden rounded-3xl border border-teal/20 bg-carbon px-8 py-14 text-center md:px-16 md:py-20">
            <Eclipse
              color="teal"
              className="left-1/2 top-1/2 h-[40vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 opacity-30"
            />
            <div className="relative flex flex-col items-center gap-6">
              <h2 className="max-w-2xl text-balance text-3xl font-bold leading-[1.1] tracking-tight text-hi sm:text-4xl md:text-5xl">
                Let&apos;s fill your calendar.
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-mid">
                Start with a free audit of your clinic&apos;s marketing. We&apos;ll
                show you exactly where the patients are leaking out — no obligation.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <ButtonLink href="/contact" variant="primary" withArrow>
                  Book a free clinic audit
                </ButtonLink>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="text-sm text-mid transition-colors hover:text-hi"
                >
                  or call {site.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
