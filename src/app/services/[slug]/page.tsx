import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  allServices,
  getService,
  siblingServices,
  getServicePoints,
  getServiceApproach,
  getServiceWork,
  getServiceWriteup,
} from "@/lib/content";
import { site } from "@/lib/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eclipse } from "@/components/ui/Eclipse";
import { AuditBanner } from "@/components/home/AuditBanner";
import { SectionNav, type NavSection } from "@/components/ui/SectionNav";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Each section type keeps the same colour on every service page, so
 * visitors learn the pattern: lavender = approach, teal = what we offer,
 * gold = work, silver = related services.
 */
const sectionColor = {
  approach: "var(--color-lavender)",
  offer: "var(--color-teal)",
  work: "var(--color-gold)",
  more: "var(--color-silver)",
};

const accentColor: Record<string, string> = {
  teal: "var(--color-teal)",
  lavender: "var(--color-lavender)",
  gold: "var(--color-gold)",
};

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) return { title: "Service not found" };
  const desc = svc.long ?? svc.detail;
  return {
    title: svc.name,
    description: desc,
    openGraph: {
      title: `${svc.name} — ${site.name}`,
      description: desc,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) notFound();

  const siblings = siblingServices(slug);
  const points = getServicePoints(slug);
  const approach = getServiceApproach(slug);
  const relatedWork = getServiceWork(slug);
  const writeup = getServiceWriteup(slug);
  const intro = writeup?.intro ?? [svc.long ?? svc.detail];
  const ac = accentColor[svc.accent];
  const hasOffer = Boolean(writeup?.offerings.length) || points.length > 0;

  const sections: NavSection[] = [
    approach && { id: "approach", label: "Approach", accent: sectionColor.approach },
    hasOffer && { id: "offer", label: "What we offer", accent: sectionColor.offer },
    relatedWork.length > 0 && { id: "work", label: "Our work", accent: sectionColor.work },
    siblings.length > 0 && {
      id: "more",
      label: `More ${svc.group}`,
      accent: sectionColor.more,
    },
  ].filter((x): x is NavSection => Boolean(x));
  const num = (id: string) => sections.findIndex((x) => x.id === id) + 1;

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section
        className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
        style={{ ["--ac" as string]: ac }}
      >
        <Eclipse
          color={svc.accent}
          className="right-[-6%] top-[-16%] h-[52vmin] w-[52vmin] opacity-40"
        />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-(--spacing-gutter)">
          <Reveal>
            <nav className="eyebrow flex items-center gap-2">
              <Link href="/services" className="transition-colors hover:text-mid">
                Services
              </Link>
              <span>/</span>
              <span style={{ color: "var(--ac)" }}>{svc.group}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-[clamp(2.4rem,7vw,5rem)] leading-[1] tracking-[-0.01em] text-hi">
              {svc.name}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7 flex max-w-2xl flex-col gap-5">
              {intro.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-lg leading-relaxed text-mid"
                      : "leading-relaxed text-lo"
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="/contact" variant="primary" withArrow>
                Start a project
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost" withArrow={false}>
                Book a free audit
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {sections.length > 1 && (
        <SectionNav page={svc.name} pageAccent={ac} sections={sections} />
      )}

      {/* ---------------- Approach ---------------- */}
      {approach && (
        <section
          id="approach"
          className="section-accent bg-ink py-20 md:py-28"
          style={{ ["--ac" as string]: sectionColor.approach }}
        >
          <div className="mx-auto grid max-w-5xl gap-8 px-(--spacing-gutter) md:grid-cols-[0.5fr_1fr] md:gap-16">
            <SectionHeader n={num("approach")} label="How we approach it" />
            <Reveal delay={0.05}>
              <p className="border-l-2 pl-6 text-balance text-xl leading-relaxed text-mid sm:text-2xl" style={{ borderColor: "color-mix(in oklab, var(--ac) 50%, transparent)" }}>
                {approach}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------- What we offer ---------------- */}
      {hasOffer && (
        <section
          id="offer"
          className="section-accent bg-void py-20 md:py-28"
          style={{ ["--ac" as string]: sectionColor.offer }}
        >
          <div className="mx-auto max-w-5xl px-(--spacing-gutter)">
            <SectionHeader
              n={num("offer")}
              label="What we offer"
              title={`${svc.name}, broken down.`}
            />

            {writeup && writeup.offerings.length > 0 ? (
              <>
                {/* Quick index of the offerings */}
                <Reveal className="mt-8 flex flex-wrap gap-2">
                  {writeup.offerings.map((o, i) => (
                    <a
                      key={o.title}
                      href={`#offer-${i + 1}`}
                      className="rounded-full border border-white/[0.1] px-3 py-1.5 text-xs text-mid transition-colors hover:border-[color:var(--ac)] hover:text-hi"
                    >
                      <span className="mr-1.5 tabular-nums" style={{ color: "var(--ac)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {o.title}
                    </a>
                  ))}
                </Reveal>

                <div className="mt-10 flex flex-col gap-4">
                  {writeup.offerings.map((o, i) => (
                    <Reveal key={o.title} amount={0.15}>
                      <article
                        id={`offer-${i + 1}`}
                        className="scroll-mt-32 grid gap-5 rounded-2xl border border-white/[0.08] bg-ink/70 p-6 md:grid-cols-[0.42fr_1fr] md:gap-12 md:p-10"
                        style={{
                          borderLeft: "2px solid color-mix(in oklab, var(--ac) 60%, transparent)",
                        }}
                      >
                        <div className="flex flex-col gap-3">
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-lo">
                            {String(i + 1).padStart(2, "0")} / {String(writeup.offerings.length).padStart(2, "0")}
                          </span>
                          <h3 className="font-display text-lg font-normal uppercase leading-snug tracking-[0.02em] text-hi md:text-xl">
                            {o.title}
                          </h3>
                        </div>
                        <div>
                          <p className="leading-relaxed text-mid">{o.copy}</p>
                          {o.bullets && o.bullets.length > 0 && (
                            <ul className="mt-6 grid gap-x-8 gap-y-3 border-t border-white/[0.06] pt-6 sm:grid-cols-2">
                              {o.bullets.map((b) => (
                                <li
                                  key={b}
                                  className="flex gap-3 text-sm leading-relaxed text-mid"
                                >
                                  <span
                                    className="mt-[0.55em] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                                    style={{ background: "var(--ac)" }}
                                    aria-hidden
                                  />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </>
            ) : (
              <RevealGroup className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
                {points.map((p, i) => (
                  <RevealItem key={i} className="h-full">
                    <div className="flex h-full flex-col gap-3 bg-void p-6">
                      <span className="section-chip self-start">0{i + 1}</span>
                      <p className="text-sm leading-relaxed text-mid">{p}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            )}

            <Reveal className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[color:color-mix(in_oklab,var(--ac)_30%,transparent)] bg-[color:color-mix(in_oklab,var(--ac)_7%,transparent)] p-6 sm:flex-row sm:items-center md:p-8">
              <div>
                <p className="text-base font-semibold tracking-tight text-hi">
                  Custom packages available.
                </p>
                <p className="mt-1 text-sm leading-relaxed text-mid">
                  Every engagement is scoped to your goals, your stage, and your budget.
                </p>
              </div>
              <div className="shrink-0">
                <ButtonLink href={site.calculatorUrl} variant="primary" withArrow>
                  Get an estimate
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------- Selected work ---------------- */}
      {relatedWork.length > 0 && (
        <section
          id="work"
          className="section-accent bg-ink py-20 md:py-28"
          style={{ ["--ac" as string]: sectionColor.work }}
        >
          <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeader
                n={num("work")}
                label="Selected work"
                title={`${svc.name}, in the wild.`}
              />
              <div className="shrink-0">
                <ButtonLink href="/portfolio" variant="ghost" withArrow>
                  View portfolio
                </ButtonLink>
              </div>
            </div>

            <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedWork.map((w) => {
                const href = w.url ?? w.href ?? "/portfolio";
                const external = Boolean(w.url || w.video);
                return (
                  <RevealItem key={`${w.name}-${w.type}`} className="h-full">
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group relative block overflow-hidden rounded-2xl border border-white/[0.08] transition-colors hover:border-[color:var(--ac)]"
                    >
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={w.image}
                          alt={`${w.name} — ${w.type} by BLXCK Marketing`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        {w.video && (
                          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                aria-hidden
                                className="ml-0.5 text-hi"
                              >
                                <path d="M4 2.5v11l9-5.5z" />
                              </svg>
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5">
                        <span className="font-heading text-lg text-hi">{w.name}</span>
                        <span className="text-[0.68rem] uppercase tracking-[0.16em] text-mid">
                          {w.type}
                        </span>
                      </div>
                    </a>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ---------------- Related in group ---------------- */}
      {siblings.length > 0 && (
        <section
          id="more"
          className="section-accent bg-void py-20 md:py-28"
          style={{ ["--ac" as string]: sectionColor.more }}
        >
          <div className="mx-auto max-w-4xl px-(--spacing-gutter)">
            <SectionHeader n={num("more")} label={`More in ${svc.group}`} />
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-start justify-between gap-4 bg-void p-6 transition-colors duration-300 hover:bg-carbon"
                >
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-semibold tracking-tight text-hi">
                      {s.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-mid">
                      {s.detail}
                    </p>
                  </div>
                  <span
                    className="mt-1 translate-x-0 text-lo transition-all duration-300 group-hover:translate-x-1 group-hover:text-hi"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <ButtonLink href="/services" variant="ghost" withArrow>
                All services
              </ButtonLink>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Audit CTA ---------------- */}
      <AuditBanner />
    </>
  );
}
