import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import {
  months,
  adConversions,
  adClicks,
  siteVisits,
  siteContacts,
  headline,
  compare,
  meta,
} from "@/lib/case-studies/optometrists";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eclipse } from "@/components/ui/Eclipse";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AuditBanner } from "@/components/home/AuditBanner";
import { MonthlyBars } from "@/components/case-study/MonthlyBars";
import { BeforeAfterSlider } from "@/components/case-study/BeforeAfterSlider";

const title = "Optometrists' Clinic Case Study";
const description =
  "How BLXCK rebuilt The Optometrists' Clinic website and nearly doubled patient contacts from Google Ads on 59% less ad spend.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} — ${site.name}`,
    description,
    images: [{ url: "/work/optometrists-case-study-og.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${site.name}`,
    description,
    images: ["/work/optometrists-case-study-og.jpg"],
  },
};

/** Section colours follow the same code as service pages. */
const accent = {
  site: "var(--color-lavender)",
  did: "var(--color-teal)",
  results: "var(--color-teal)",
  compare: "var(--color-teal)",
};

export default function OptometristsCaseStudy() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section
        className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-16"
        style={{ ["--ac" as string]: accent.did }}
      >
        <Eclipse
          color="teal"
          className="right-[-8%] top-[-18%] h-[56vmin] w-[56vmin] opacity-40"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-(--spacing-gutter)">
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
            <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.4rem,6.5vw,4.8rem)] leading-[1] text-hi">
              More patients. Less than half the ad spend.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mid">
              The Optometrists&rsquo; Clinic has served Edmonton since 1938 across
              five locations. In 2025 they moved their website, Google Ads and
              Meta Ads from a national directory company to BLXCK.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {headline.map((s) => (
              <RevealItem key={s.label} className="h-full">
                <div className="flex h-full flex-col gap-2 bg-void p-6">
                  <span className="font-heading text-4xl leading-none text-teal tabular-nums md:text-5xl">
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

      {/* ---------------- Then vs now ---------------- */}
      <section
        id="compare"
        className="section-accent bg-void py-20 md:py-24"
        style={{ ["--ac" as string]: accent.compare }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeader n={1} label="Then vs now" title="Same clinics. Different return." />
          <Reveal className="mt-10 overflow-x-auto rounded-2xl border border-white/[0.08]">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-left text-[0.68rem] uppercase tracking-[0.16em] text-lo">
                  <th className="px-5 py-4 font-semibold"></th>
                  <th className="px-5 py-4 text-right font-semibold text-lo">
                    <span className="text-sm tracking-[0.2em]">{compare.thenLabel}</span>
                    <span className="block normal-case tracking-normal text-lo/70">{compare.thenPeriod}</span>
                  </th>
                  <th className="bg-gold/[0.08] px-5 py-4 text-right font-semibold text-gold">
                    <span className="text-sm tracking-[0.2em]">{compare.nowLabel}</span>
                    <span className="block normal-case tracking-normal text-gold/70">{compare.nowPeriod}</span>
                  </th>
                  <th className="px-5 py-4 text-right font-semibold text-gold">Change</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {compare.rows.map((r) => (
                  <tr key={r.k} className="border-t border-white/[0.08]">
                    <td className="px-5 py-3.5 text-hi">{r.k}</td>
                    <td className="px-5 py-3.5 text-right text-lo">{r.then}</td>
                    <td className="bg-gold/[0.08] px-5 py-3.5 text-right font-semibold text-gold">{r.now}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-gold">{r.delta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="mt-4 text-xs leading-relaxed text-lo">
            Spend and cost figures are indexed to the previous agency at 100%. Previous-agency figures come from that agency&rsquo;s own year-end reports.
          </p>
        </div>
      </section>

      {/* ---------------- Before / after ---------------- */}
      <section
        id="website"
        className="section-accent bg-ink py-20 md:py-24"
        style={{ ["--ac" as string]: accent.site }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeader n={2} label="The website" title="See the difference." />
          <Reveal className="mt-10">
            <BeforeAfterSlider
              before={{ src: "/work/optometrists-before.webp", alt: "The previous Optometrists' Clinic homepage on Wix" }}
              after={{ src: "/work/optometrists-after.webp", alt: "The new Optometrists' Clinic homepage built by BLXCK" }}
              initial={55}
            />
          </Reveal>
          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <p className="text-mid">
              <span className="mr-2 font-semibold uppercase tracking-[0.18em] text-lo">Before</span>
              Wix. 1 MB of page code. No call tracking.
            </p>
            <p className="text-mid sm:text-right">
              <span className="mr-2 font-semibold uppercase tracking-[0.18em] text-gold">After</span>
              WordPress. 60% less page code. Every call counted.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- What we did ---------------- */}
      <section
        id="work"
        className="section-accent bg-void py-20 md:py-24"
        style={{ ["--ac" as string]: accent.did }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeader n={3} label="What we did" title="Three moves." />
          <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
            {[
              {
                t: "Rebuilt the site",
                d: "Fast WordPress build with a dedicated page for each of the five clinics.",
              },
              {
                t: "One campaign per clinic",
                d: "Five location-based Google Ads campaigns, each optimizing toward calls and bookings.",
              },
              {
                t: "Counted every call",
                d: "Phone taps, forms and emails tracked on the site and fed back to the ads.",
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
        className="section-accent bg-ink py-20 md:py-24"
        style={{ ["--ac" as string]: accent.results }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeader n={4} label="Results" title="Month by month." />
          <RevealGroup className="mt-10 grid gap-8 lg:grid-cols-2">
            <RevealItem>
              <div className="rounded-2xl border border-white/[0.08] bg-ink/70 p-6 md:p-8">
                <h3 className="text-base font-semibold text-hi">Google Ads conversions per month</h3>
                <p className="mt-1 text-sm text-lo">
                  387 in the first full month. 684 by March 2026. Same monthly budget throughout.
                </p>
                <div className="mt-6">
                  <MonthlyBars
                    labels={months}
                    values={adConversions}
                    max={780}
                    ticks={[0, 200, 400, 600]}
                    highlight={[1, 11]}
                    ariaLabel="Google Ads conversions per month, April 2025 to September 2026"
                    tooltips={adConversions.map(
                      (v, i) => `${Math.round(v)} conversions · ${adClicks[i].toLocaleString("en-CA")} clicks`,
                    )}
                  />
                </div>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="rounded-2xl border border-white/[0.08] bg-ink/70 p-6 md:p-8">
                <h3 className="text-base font-semibold text-hi">Patient contacts from the website</h3>
                <p className="mt-1 text-sm text-lo">
                  Visits halved in 2026 when out-of-town blog traffic dropped. Local contacts didn&rsquo;t.
                </p>
                <div className="mt-6">
                  <MonthlyBars
                    labels={months}
                    values={siteContacts}
                    max={780}
                    ticks={[0, 200, 400, 600]}
                    highlight={[4, 17]}
                    ariaLabel="Patient contacts tracked on the website per month"
                    tooltips={siteContacts.map(
                      (v, i) =>
                        `${v} contacts · ${((v / siteVisits[i]) * 100).toFixed(1)}% of ${siteVisits[i].toLocaleString("en-CA")} visits`,
                    )}
                  />
                </div>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- Meta ---------------- */}
      <section
        id="meta"
        className="section-accent bg-void py-20 md:py-24"
        style={{ ["--ac" as string]: accent.site }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeader n={5} label="Meta Ads" title="Always on." />
          <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
            {meta.map((s) => (
              <RevealItem key={s.label} className="h-full">
                <div className="flex h-full flex-col gap-2 bg-void p-6">
                  <span className="font-heading text-4xl leading-none text-hi tabular-nums">{s.value}</span>
                  <span className="mt-2 text-sm font-semibold text-hi">{s.label}</span>
                  <span className="text-xs leading-relaxed text-lo">{s.note}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- Services used ---------------- */}
      <section className="bg-ink py-14">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-(--spacing-gutter)">
          <span className="eyebrow mr-2">Services used</span>
          {[
            ["Web Development", "/services/web-development"],
            ["Advertising", "/services/advertising"],
            ["Social Media Management", "/services/social-media-management"],
            ["SEO", "/services/seo"],
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
