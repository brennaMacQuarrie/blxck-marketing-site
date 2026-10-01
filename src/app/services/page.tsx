import type { Metadata } from "next";
import { serviceGroups, packages } from "@/lib/content";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eclipse } from "@/components/ui/Eclipse";
import { AuditBanner } from "@/components/home/AuditBanner";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-service marketing from BLXCK — consulting, marketing, in-house creation, and web. Strategy, advertising, content, branding, SEO and more, plus monthly packages.",
  openGraph: {
    title: `Services — ${site.name}`,
    description:
      "Consulting, marketing, creation, and web — everything a growing brand needs, under one roof.",
  },
};

const accentColor: Record<string, string> = {
  teal: "var(--color-teal)",
  lavender: "var(--color-lavender)",
  gold: "var(--color-gold)",
};

const check = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden
    className="mt-0.5 shrink-0"
  >
    <path
      d="M3 8.5l3.2 3.2L13 5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ServicesPage() {
  return (
    <>
      {/* ---------------- Intro ---------------- */}
      <section className="relative flex min-h-[60svh] items-center overflow-hidden pt-16">
        <Eclipse
          color="teal"
          className="right-[-8%] top-[-20%] h-[60vmin] w-[60vmin] opacity-40"
        />
        <Eclipse
          color="lavender"
          className="left-[-6%] bottom-[-20%] h-[46vmin] w-[46vmin] opacity-30"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-(--spacing-gutter)">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-teal/60" />
                Services
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-7 font-body text-[clamp(2.4rem,6.5vw,5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-hi">
                Everything a growing brand needs,{" "}
                <span className="text-spectrum">under one roof.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-mid">
                Strategy, in-house creative, paid media, and web — run by one
                team, pointed at one goal: making your business impossible to
                ignore.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <ButtonLink href="/contact" variant="primary" withArrow>
                  Start a project
                </ButtonLink>
                <ButtonLink href="#packages" variant="ghost" withArrow={false}>
                  See packages
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Service groups ---------------- */}
      <section className="border-t border-white/[0.06] bg-void">
        {serviceGroups.map((g, idx) => (
          <div
            key={g.key}
            className="border-b border-white/[0.06]"
            style={{ ["--ac" as string]: accentColor[g.accent] }}
          >
            <div className="mx-auto grid max-w-6xl gap-10 px-(--spacing-gutter) py-20 md:py-24 lg:grid-cols-[0.85fr_1.15fr]">
              {/* group header */}
              <Reveal>
                <div className="flex flex-col gap-5 lg:sticky lg:top-28">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-sm font-semibold tabular-nums"
                      style={{ color: "var(--ac)" }}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className="h-px w-10"
                      style={{ background: "var(--ac)" }}
                    />
                  </div>
                  <h2 className="font-heading text-4xl leading-none text-hi md:text-5xl">
                    {g.title}
                  </h2>
                  <p className="max-w-sm text-mid">{g.blurb}</p>
                </div>
              </Reveal>

              {/* items */}
              <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
                {g.items.map((it) => (
                  <RevealItem key={it.name} className="h-full">
                    <div className="group flex h-full flex-col gap-2 bg-void p-6 transition-colors duration-300 hover:bg-carbon">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full opacity-50 transition-opacity group-hover:opacity-100"
                          style={{ background: "var(--ac)" }}
                        />
                        <h3 className="text-[0.98rem] font-semibold tracking-tight text-hi">
                          {it.name}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-mid">
                        {it.detail}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        ))}
      </section>

      {/* ---------------- Packages ---------------- */}
      <section
        id="packages"
        className="scroll-mt-24 border-b border-white/[0.06] bg-ink py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeading
            eyebrow="Monthly packages"
            title="Pick the engine that fits."
            lede="Transparent monthly retainers — scale up as you grow. Every tier includes a direct line to your strategist."
          />

          <RevealGroup className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
            {packages.map((p) => (
              <RevealItem key={p.name} className="h-full">
                <div
                  className={`relative flex h-full flex-col gap-6 rounded-2xl border p-8 ${
                    p.featured
                      ? "border-teal/40 bg-carbon shadow-[0_0_40px_-12px_rgba(126,190,197,0.35)]"
                      : "border-white/[0.08] bg-carbon/40"
                  }`}
                  style={{ ["--ac" as string]: accentColor[p.accent] }}
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-8 rounded-full bg-teal px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-void">
                      Most popular
                    </span>
                  )}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold tracking-tight text-hi">
                      {p.name}
                    </h3>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading text-4xl text-hi">
                        {p.price}
                      </span>
                      <span className="text-sm text-lo">{p.cadence}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-mid">
                      {p.summary}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-3 border-t border-white/[0.08] pt-6">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex gap-2.5 text-sm text-mid"
                        style={{ color: undefined }}
                      >
                        <span style={{ color: "var(--ac)" }}>{check}</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-2">
                    <ButtonLink
                      href="/contact"
                      variant={p.featured ? "primary" : "ghost"}
                      withArrow
                      className="w-full"
                    >
                      Get started
                    </ButtonLink>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-8">
            <p className="text-center text-sm text-lo">
              Not sure which fits?{" "}
              <a href="/contact" className="text-mid underline-offset-4 hover:text-hi hover:underline">
                Book a free audit
              </a>{" "}
              and we&apos;ll point you to the right one.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Audit offer ---------------- */}
      <AuditBanner />
    </>
  );
}
