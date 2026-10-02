import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  allServices,
  getService,
  siblingServices,
  getServicePoints,
  getServiceWork,
} from "@/lib/content";
import { site } from "@/lib/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eclipse } from "@/components/ui/Eclipse";
import { AuditBanner } from "@/components/home/AuditBanner";

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
  const relatedWork = getServiceWork(slug);
  const ac = accentColor[svc.accent];

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
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-mid">
              {svc.long ?? svc.detail}
            </p>
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

      {/* ---------------- What's included ---------------- */}
      {points.length > 0 && (
        <section
          className="border-t border-white/[0.06] bg-void py-20 md:py-28"
          style={{ ["--ac" as string]: ac }}
        >
          <div className="mx-auto max-w-4xl px-(--spacing-gutter)">
            <Reveal>
              <span className="eyebrow flex items-center gap-3">
                <span className="inline-block h-px w-8" style={{ background: ac }} />
                What&apos;s included
              </span>
            </Reveal>
            <RevealGroup className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
              {points.map((p, i) => (
                <RevealItem key={i} className="h-full">
                  <div className="flex h-full flex-col gap-3 bg-void p-6">
                    <span className="text-xs tabular-nums" style={{ color: ac }}>
                      0{i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-mid">{p}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ---------------- Selected work ---------------- */}
      {relatedWork.length > 0 && (
        <section className="border-t border-white/[0.06] bg-ink py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <Reveal>
                <span className="eyebrow mb-4 flex items-center gap-3">
                  <span className="inline-block h-px w-8" style={{ background: ac }} />
                  Selected work
                </span>
                <h2 className="text-balance text-3xl tracking-tight text-hi sm:text-4xl">
                  {svc.name}, in the wild.
                </h2>
              </Reveal>
              <div className="shrink-0">
                <ButtonLink href="/portfolio" variant="ghost" withArrow>
                  View portfolio
                </ButtonLink>
              </div>
            </div>

            <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedWork.map((w) => (
                <RevealItem key={`${w.name}-${w.type}`} className="h-full">
                  <a
                    href={w.href ?? "/portfolio"}
                    target={w.video ? "_blank" : undefined}
                    rel={w.video ? "noopener noreferrer" : undefined}
                    className="group relative block overflow-hidden rounded-2xl border border-white/[0.08]"
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
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ---------------- Related in group ---------------- */}
      {siblings.length > 0 && (
        <section className="border-t border-white/[0.06] bg-void py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-(--spacing-gutter)">
            <Reveal>
              <span className="eyebrow flex items-center gap-3">
                <span
                  className="inline-block h-px w-8"
                  style={{ background: ac }}
                />
                More in {svc.group}
              </span>
            </Reveal>
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-start justify-between gap-4 bg-void p-6 transition-colors duration-300 hover:bg-carbon"
                >
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-base font-semibold tracking-tight text-hi">
                      {s.name}
                    </h2>
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
