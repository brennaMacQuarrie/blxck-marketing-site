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
    "Full-business growth for medical and health companies — systems and technical audits, revenue-leak analysis, online-presence clarity, patient acquisition, training, and multi-clinic enablement.",
  openGraph: {
    title: `Medical Marketing Solutions — ${site.name}`,
    description:
      "Support across every facet of your health business — audits, systems, revenue, presence, acquisition, training, and multi-location growth.",
  },
};

export default function MedicalMarketingPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative flex min-h-[86svh] items-center overflow-hidden pt-32 pb-12 md:pt-28">
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
            <h1 className="mt-7 font-heading text-[clamp(2.3rem,6vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.01em] text-hi">
              {medical.headlineLead}{" "}
              <span className="text-spectrum">{medical.headlineAccent}</span>{" "}
              {medical.headlineTail}
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
                Book a free audit
              </ButtonLink>
              <ButtonLink href="#services" variant="ghost" withArrow={false}>
                What we cover
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 text-xs uppercase tracking-[0.22em] text-lo">
              {medical.trustLine}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Industries ---------------- */}
      <section className="border-t border-white/[0.06] bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeading
            eyebrow="Who we work with"
            title="We know your category."
            lede="These are categories where the usual marketing playbook doesn't apply. We've learned the rules — and how to grow inside them."
          />
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {medical.industries.map((ind) => (
              <RevealItem key={ind.name} className="h-full">
                <div className="flex h-full flex-col gap-3 bg-ink p-7">
                  <h3 className="text-base font-semibold tracking-tight text-hi">
                    {ind.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-mid">{ind.copy}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- Problem ---------------- */}
      <section className="border-t border-white/[0.06] bg-void py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeading
            eyebrow="The problem"
            title="The usual playbook doesn't work here."
            lede="In regulated, high-trust categories, 'just run more ads' isn't an option — and the gaps that hold you back are rarely the obvious ones."
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
            eyebrow="What we do"
            title="Growth that doesn't rely on ads alone."
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
            lede="Psychedelics, cannabis, optometry — brands we support across the categories most agencies avoid."
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
            eyebrow="Why BLXCK for health"
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
            title="From first audit to measurable growth."
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
              <h2 className="max-w-2xl text-balance text-3xl leading-[1.05] text-hi sm:text-4xl md:text-5xl">
                Start with a real audit.
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-mid">
                We&apos;ll show you where your business is leaking revenue, which
                tools you&apos;re underusing, and where the fastest wins are — no
                obligation.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <ButtonLink href="/contact" variant="primary" withArrow>
                  Book a free audit
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
