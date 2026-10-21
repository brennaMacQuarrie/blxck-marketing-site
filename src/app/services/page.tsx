import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { serviceGroups, packages, slugify, serviceImage } from "@/lib/content";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eclipse } from "@/components/ui/Eclipse";
import { AuditBanner } from "@/components/home/AuditBanner";
import { SectionNav, type NavSection } from "@/components/ui/SectionNav";

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

/** Bundles are hidden until the team is ready to publish them. */
const SHOW_BUNDLES = false;

export default function ServicesPage() {
  const sections: NavSection[] = [
    ...serviceGroups.map((g) => ({
      id: g.key,
      label: g.title,
      accent: accentColor[g.accent],
    })),
    ...(SHOW_BUNDLES
      ? [{ id: "packages", label: "Bundles", accent: "var(--color-gold)" }]
      : []),
  ];

  return (
    <>
      {/* ---------------- Intro ---------------- */}
      <section className="relative flex min-h-[60svh] items-center overflow-hidden pt-32 pb-12 md:pt-28">
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
              <h1 className="mt-7 font-heading text-[clamp(2.6rem,7vw,5.5rem)] font-normal leading-[1.02] tracking-[-0.01em] text-hi">
                Everything it takes{" "}
                <span className="text-spectrum">to grow.</span>
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
                <ButtonLink href={site.calculatorUrl} variant="ghost" withArrow={false}>
                  Build a custom plan
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionNav page="Services" pageAccent="var(--color-teal)" sections={sections} />

      {/* ---------------- Service groups ---------------- */}
      <section className="bg-void">
        {serviceGroups.map((g, idx) => (
          <div
            key={g.key}
            id={g.key}
            className={`svc-group section-accent ${idx % 2 === 0 ? "bg-void" : "bg-ink"}`}
            style={{ ["--ac" as string]: accentColor[g.accent] }}
          >
            <div className="mx-auto grid max-w-6xl gap-10 px-(--spacing-gutter) py-20 md:py-24 lg:grid-cols-[0.85fr_1.15fr]">
              {/* group header */}
              <Reveal>
                <div className="flex flex-col gap-5 lg:sticky lg:top-36">
                  <div className="flex items-center gap-3">
                    <span className="section-chip">0{idx + 1}</span>
                    <span className="eyebrow" style={{ color: "var(--ac)" }}>
                      {g.items.length} services
                    </span>
                  </div>
                  <h2 className="font-heading text-4xl leading-none text-hi md:text-5xl">
                    {g.title}
                  </h2>
                  <p className="max-w-sm text-mid">{g.blurb}</p>

                  {/* Portfolio preview — follows the hovered service (CSS :has) */}
                  <div className="svc-preview relative mt-3 hidden aspect-[4/3] max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-carbon lg:block">
                    {g.items.map((it) => {
                      const slug = slugify(it.name);
                      return (
                        <div key={slug} data-svc={slug} className="svc-shot absolute inset-0">
                          <Image
                            src={serviceImage[slug]}
                            alt=""
                            aria-hidden
                            fill
                            sizes="384px"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                          <span className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-hi">
                            {it.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              {/* items */}
              <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
                {g.items.map((it) => (
                  <RevealItem key={it.name} className="h-full">
                    <Link
                      href={`/services/${slugify(it.name)}`}
                      data-svc={slugify(it.name)}
                      className="group flex h-full flex-col gap-2 bg-void p-6 ring-1 ring-inset ring-transparent transition-all duration-300 hover:bg-carbon hover:ring-white/10"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-1.5 w-1.5 rounded-full opacity-60 transition-opacity group-hover:opacity-100"
                            style={{ background: "var(--ac)" }}
                          />
                          <h3 className="text-[0.98rem] font-semibold tracking-tight text-hi">
                            {it.name}
                          </h3>
                        </div>
                        <span
                          className="shrink-0 text-mid transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--ac)]"
                          aria-hidden
                        >
                          →
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-mid">
                        {it.long ?? it.detail}
                      </p>
                      <span className="mt-auto pt-3 text-xs font-medium uppercase tracking-[0.15em] text-lo transition-colors group-hover:text-[var(--ac)]">
                        Learn more
                      </span>
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        ))}

        <style>{`
          .svc-shot {
            opacity: 0;
            transform: scale(1.04);
            transition: opacity .5s ease, transform .8s cubic-bezier(.16,1,.3,1);
          }
          /* Default: first service in the group. */
          .svc-group:not(:has(a[data-svc]:is(:hover, :focus-visible))) .svc-shot:first-child {
            opacity: 1;
            transform: none;
          }
          ${serviceGroups
            .flatMap((g) => g.items.map((it) => slugify(it.name)))
            .map(
              (slug) =>
                `.svc-group:has(a[data-svc="${slug}"]:is(:hover, :focus-visible)) .svc-shot[data-svc="${slug}"] { opacity: 1; transform: none; }`,
            )
            .join("\n")}
        `}</style>
      </section>

      {/* ---------------- Packages (hidden for now) ---------------- */}
      {SHOW_BUNDLES && (
      <section
        id="packages"
        className="section-accent border-b border-white/[0.06] bg-ink py-24 md:py-32"
        style={{ ["--ac" as string]: "var(--color-gold)" }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeading
            eyebrow="Popular bundles"
            title="Every brand is different. So is every plan."
            lede="We build each engagement around your goals, your stage, and your budget — there are no rigid tiers. These are a few bundles clients start with most often. Want a real number for your business? Run a quick estimate."
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
                    <h3 className="text-xl font-semibold tracking-tight text-hi">
                      {p.name}
                    </h3>
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
                      href={site.calculatorUrl}
                      variant={p.featured ? "primary" : "ghost"}
                      withArrow
                      className="w-full"
                    >
                      Get an estimate
                    </ButtonLink>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-8">
            <p className="text-center text-sm text-lo">
              Not sure where to start?{" "}
              <a
                href="/contact"
                className="text-mid underline-offset-4 hover:text-hi hover:underline"
              >
                Book a Full Brand Audit
              </a>{" "}
              and we&apos;ll map it out together.
            </p>
          </Reveal>
        </div>
      </section>
      )}

      {/* ---------------- Audit offer ---------------- */}
      <AuditBanner />
    </>
  );
}
