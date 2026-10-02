import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allServices,
  getService,
  siblingServices,
} from "@/lib/content";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
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
