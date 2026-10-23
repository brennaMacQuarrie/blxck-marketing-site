import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { projects } from "@/lib/content";
import {
  months,
  jingleFrom,
  siteUsers,
  siteVisits,
  directVisits,
  headline,
  compare,
  radio,
  meta,
  jingleUrl,
  brandVideoUrl,
} from "@/lib/case-studies/ardent";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eclipse } from "@/components/ui/Eclipse";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AuditBanner } from "@/components/home/AuditBanner";
import { MonthlyBars } from "@/components/case-study/MonthlyBars";
import { TrendMark } from "@/components/case-study/TrendMark";

const title = "Ardent Roof Systems Case Study";
const description =
  "How BLXCK built the Ardent Roof Systems brand from the ground up: five times the website audience, Calgary up 58%, and a radio jingle that doubled the reach of the Free Roof Giveaway.";

/** Keep the page out of search results until it lives on blxckmarketing.com. */
const onMainDomain = site.url.includes("blxckmarketing.com");

export const metadata: Metadata = {
  title,
  description,
  robots: onMainDomain ? undefined : { index: false, follow: false },
  openGraph: {
    title: `${title} — ${site.name}`,
    description,
    images: [{ url: "/work/ardent-case-study-og.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${site.name}`,
    description,
    images: ["/work/ardent-case-study-og.jpg"],
  },
};

/** Section colours follow the same code as service pages. */
const accent = {
  brand: "var(--color-gold)",
  radio: "var(--color-lavender)",
  meta: "var(--color-teal)",
};

export default function ArdentCaseStudy() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section
        className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24"
        style={{ ["--ac" as string]: accent.brand }}
      >
        <Eclipse
          color="gold"
          className="right-[-8%] top-[-18%] h-[56vmin] w-[56vmin] opacity-40"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-(--spacing-gutter)">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div>
              <Reveal>
                <nav className="eyebrow flex items-center gap-2">
                  <Link href="/portfolio" className="transition-colors hover:text-mid">
                    Portfolio
                  </Link>
                  <span>/</span>
                  <span style={{ color: "var(--ac)" }}>Case study</span>
                </nav>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-6 text-balance text-[clamp(2.3rem,5vw,4.2rem)] leading-[1] text-hi">
                  A roofing brand built from the ground up.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-mid">
                  Ardent Roof Systems installs and repairs roofs across Edmonton and
                  Calgary. Since 2024, BLXCK has been its marketing department:
                  brand, website, ads, video, events and, since May 2026, a radio
                  jingle people can&rsquo;t get out of their heads.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={jingleUrl} variant="ghost" withArrow>
                    Hear the jingle
                  </ButtonLink>
                  <ButtonLink href={brandVideoUrl} variant="ghost" withArrow>
                    Watch the brand story
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15} direction="left">
              <a
                href="https://ardentroofsystems.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-ink"
              >
                <Image
                  src="/work/web/ardent.webp"
                  alt="The Ardent Roof Systems website built by BLXCK"
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </a>
              <div className="mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1 text-xs text-lo">
                <span><span className="mr-1.5 font-semibold uppercase tracking-[0.18em]">2024</span>New logo, brand guide and website.</span>
                <span><span className="mr-1.5 font-semibold uppercase tracking-[0.18em] text-gold">2026</span>On the radio in two cities.</span>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {headline.map((s) => (
              <RevealItem key={s.section} className="h-full">
                <div className="flex h-full flex-col gap-2 bg-void p-6">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-lo">{s.section}</span>
                  <span className="flex items-center gap-2 font-heading text-4xl leading-none text-hi tabular-nums md:text-5xl">
                    {s.trend && <TrendMark trend={s.trend} size="lg" />}
                    {s.value}
                  </span>
                  <span className="mt-1 text-sm font-semibold text-hi">{s.label}</span>
                  {s.from && s.to && (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/[0.1] bg-carbon px-2.5 py-1 text-xs tabular-nums">
                      <span className="text-lo line-through decoration-lo/60">{s.from}</span>
                      <span className="text-lo" aria-hidden>→</span>
                      <span className="font-semibold text-hi">{s.to}</span>
                    </span>
                  )}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- Then vs now ---------------- */}
      <section
        id="compare"
        className="section-accent bg-void py-20 md:py-24"
        style={{ ["--ac" as string]: accent.brand }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeader n={1} label="Then vs now" title="Same roofs. A much bigger audience." />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {compare.boxes.map((b) => (
              <RevealItem key={`${b.channel}-${b.label}`} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/[0.08] bg-ink/70 p-6">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-lo">{b.channel}</span>
                  <span className="text-base font-semibold leading-snug text-hi">{b.label}</span>
                  <span className="flex items-center gap-2 font-heading text-4xl leading-none text-hi tabular-nums">
                    <TrendMark trend={b.trend} size="lg" />
                    {b.delta}
                    <span className="font-body text-sm font-semibold text-mid">{b.trend === "up" ? "more" : "less"}</span>
                  </span>
                  {b.from && b.to && (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/[0.1] bg-carbon px-2.5 py-1 text-xs tabular-nums">
                      <span className="text-lo line-through decoration-lo/60">{b.from}</span>
                      <span className="text-lo" aria-hidden>→</span>
                      <span className="font-semibold text-hi">{b.to}</span>
                    </span>
                  )}
                  <span className="text-sm leading-relaxed text-mid">{b.detail}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-5 text-xs leading-relaxed text-lo">
            Before: {compare.thenPeriod}. After: {compare.nowPeriod}. Each box compares the same months of both years. All figures come from Ardent&rsquo;s own Google Analytics, Google Ads and Meta Ads accounts, pulled 23 October 2026. Spending is shown as a percentage change, not in dollars.
          </p>
        </div>
      </section>

      {/* ---------------- What we did ---------------- */}
      <section
        id="work"
        className="section-accent bg-ink py-20 md:py-24"
        style={{ ["--ac" as string]: accent.brand }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeader n={2} label="What we did" title="Four moves." />
          <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Built the brand",
                d: "A new shield logo and brand guide, business cards for the crew, a brand story video, and a website with a page for every service in Edmonton and Calgary.",
              },
              {
                t: "Kept the ads always on",
                d: "Google campaigns for each city and Facebook and Instagram ads, running every month since launch and tuned toward calls and forms, not clicks.",
              },
              {
                t: "Wrote the jingle",
                d: "Crazy About Roofs: a custom radio jingle, written and produced in-house, on air in Edmonton and Calgary since May 2026 in 15- and 30-second cuts, with special spots for the golf tournaments and the roof giveaway.",
              },
              {
                t: "Made events the brand owns",
                d: "Charity golf tournaments in both cities and a Free Roof Giveaway with public voting, each with its own campaign, video and landing pages.",
              },
            ].map((m, i) => (
              <RevealItem key={m.t} className="h-full">
                <div className="flex h-full flex-col gap-3 bg-void p-6 md:p-8">
                  <span className="section-chip self-start">0{i + 1}</span>
                  <h3 className="font-heading text-2xl font-normal text-hi">{m.t}</h3>
                  <p className="text-sm leading-relaxed text-mid">{m.d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- Results ---------------- */}
      <section
        id="results"
        className="section-accent bg-void py-20 md:py-24"
        style={{ ["--ac" as string]: accent.brand }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeader n={3} label="Results" title="Month by month." lede="June 2024, the first full month of the new site, to September 2026. Every month is shown; nothing is left off." />
          <RevealGroup className="mt-10 grid gap-8 lg:grid-cols-2">
            <RevealItem>
              <div className="rounded-2xl border border-white/[0.08] bg-ink/70 p-6 md:p-8">
                <h3 className="text-base font-semibold text-hi">People visiting the website, each month</h3>
                <p className="mt-1 text-sm text-lo">
                  About 260 a month in the first six months. About 1,400 a month in 2026. August 2026, with the giveaway on the radio, was the biggest month yet: 3,574 people.
                </p>
                <div className="mt-6">
                  <MonthlyBars
                    labels={months}
                    values={siteUsers}
                    max={3800}
                    ticks={[0, 1000, 2000, 3000]}
                    highlight={[0, 14, 26]}
                    band={{ from: jingleFrom, label: "Jingle on air" }}
                    ariaLabel="People visiting the Ardent Roof Systems website per month, June 2024 to September 2026"
                    tooltips={siteUsers.map(
                      (v, i) => `${v.toLocaleString("en-CA")} people · ${siteVisits[i].toLocaleString("en-CA")} visits`,
                    )}
                  />
                </div>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="rounded-2xl border border-white/[0.08] bg-ink/70 p-6 md:p-8">
                <h3 className="text-base font-semibold text-hi">Visitors who typed the address in, each month</h3>
                <p className="mt-1 text-sm text-lo">
                  Direct visits are the ones no ad or search can claim. Four of the five months since the jingle went on air have beaten the same month a year earlier, and the giveaway month nearly doubled.
                </p>
                <div className="mt-6">
                  <MonthlyBars
                    labels={months}
                    values={directVisits}
                    max={2100}
                    ticks={[0, 500, 1000, 1500, 2000]}
                    highlight={[14, 26, 27]}
                    band={{ from: jingleFrom, label: "Jingle on air" }}
                    ariaLabel="Direct visits to the Ardent Roof Systems website per month, June 2024 to September 2026"
                    tooltips={directVisits.map(
                      (v, i) =>
                        `${v.toLocaleString("en-CA")} direct · ${((v / siteVisits[i]) * 100).toFixed(0)}% of ${siteVisits[i].toLocaleString("en-CA")} visits`,
                    )}
                  />
                </div>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- Radio ---------------- */}
      <section
        id="radio"
        className="section-accent bg-ink py-20 md:py-24"
        style={{ ["--ac" as string]: accent.radio }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader n={4} label="Radio" title="Crazy About Roofs." lede="A custom jingle, written and produced by BLXCK, on air in Edmonton and Calgary since May 2026." />
            <div className="shrink-0">
              <ButtonLink href={jingleUrl} variant="ghost" withArrow>
                Hear the jingle
              </ButtonLink>
            </div>
          </div>
          <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
            {radio.map((s) => (
              <RevealItem key={s.label} className="h-full">
                <div className="flex h-full flex-col gap-2 bg-void p-6">
                  <span className="flex items-center gap-2 font-heading text-4xl leading-none text-hi tabular-nums">
                    {s.trend && <TrendMark trend={s.trend} size="lg" />}
                    {s.value}
                  </span>
                  <span className="mt-2 text-sm font-semibold text-hi">{s.label}</span>
                  <span className="text-xs leading-relaxed text-lo">{s.note}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-5 text-xs leading-relaxed text-lo">
            Radio can&rsquo;t be tracked click by click. What it leaves behind is people who remember the name: they type the address in, search for Ardent by name, and turn up for the brand&rsquo;s own events. Those are the numbers above.
          </p>
        </div>
      </section>

      {/* ---------------- Meta ---------------- */}
      <section
        id="meta"
        className="section-accent bg-void py-20 md:py-24"
        style={{ ["--ac" as string]: accent.meta }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeader n={5} label="Meta Ads" title="Always on." />
          <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
            {meta.map((s) => (
              <RevealItem key={s.label} className="h-full">
                <div className="flex h-full flex-col gap-2 bg-void p-6">
                  <span className="flex items-center gap-2 font-heading text-4xl leading-none text-hi tabular-nums">
                    {s.trend && <TrendMark trend={s.trend} size="lg" />}
                    {s.value}
                  </span>
                  <span className="mt-2 text-sm font-semibold text-hi">{s.label}</span>
                  <span className="text-xs leading-relaxed text-lo">{s.note}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- More work ---------------- */}
      <section
        id="more-work"
        className="section-accent bg-ink py-20 md:py-24"
        style={{ ["--ac" as string]: "var(--color-silver)" }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader n={6} label="More work" title="Other brands we've grown." />
            <div className="shrink-0">
              <ButtonLink href="/portfolio" variant="ghost" withArrow>
                View portfolio
              </ButtonLink>
            </div>
          </div>
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-3">
            {projects
              .filter((p) => ["Optometrists' Clinic", "REX Equipment", "Hansen Distillery"].includes(p.name))
              .map((p) => (
                <RevealItem key={p.name} className="h-full">
                  <Link
                    href={p.href ?? "/portfolio"}
                    className="group relative block overflow-hidden rounded-2xl border border-white/[0.08] transition-colors hover:border-white/25"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={p.image}
                        alt={`${p.name} by BLXCK Marketing`}
                        fill
                        sizes="(min-width: 640px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1 p-5">
                      <span className="text-[0.68rem] uppercase tracking-[0.16em] text-mid">{p.sector}</span>
                      <span className="font-heading text-xl text-hi">{p.name}</span>
                      <span className="text-sm leading-snug text-mid">{p.blurb}</span>
                    </div>
                  </Link>
                </RevealItem>
              ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- Services used ---------------- */}
      <section className="bg-void py-14">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-(--spacing-gutter)">
          <span className="eyebrow mr-2">Services used</span>
          {[
            ["Branding", "/services/branding"],
            ["Web Development", "/services/web-development"],
            ["Advertising", "/services/advertising"],
            ["Jingles & Radio Ads", "/services/jingles-and-radio-ads"],
            ["Videography", "/services/videography"],
            ["Graphic Design", "/services/graphic-design"],
            ["Social Media Management", "/services/social-media-management"],
            ["Analytics", "/services/analytics"],
            ["Strategy", "/services/strategy"],
          ].map(([name, href]) => (
            <ButtonLink key={href} href={href} variant="ghost" withArrow={false} className="text-xs">
              {name}
            </ButtonLink>
          ))}
        </div>
      </section>

      <AuditBanner />
    </>
  );
}
