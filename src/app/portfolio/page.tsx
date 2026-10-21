import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { work, workSections, clientLogos, caseStudies } from "@/lib/content";
import type { WorkItem } from "@/lib/content";
import { site } from "@/lib/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eclipse } from "@/components/ui/Eclipse";
import { SectionNav, type NavSection } from "@/components/ui/SectionNav";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LogoCarousel } from "@/components/ui/LogoCarousel";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work from BLXCK Marketing — brands across e-commerce, medical, cannabis, capital, and non-profit that we've made impossible to ignore.",
  openGraph: {
    title: `Portfolio — ${site.name}`,
    description: "Selected work from BLXCK Marketing.",
  },
};

const accentColor: Record<string, string> = {
  teal: "var(--color-teal)",
  lavender: "var(--color-lavender)",
  gold: "var(--color-gold)",
  silver: "var(--color-silver)",
};

const navSections: NavSection[] = [
  { id: "clients", label: "Clients", accent: "var(--color-silver)" },
  ...workSections.map((sec) => ({
    id: sec.tag,
    label: sec.title.replace(" Content", ""),
    accent: accentColor[sec.accent],
  })),
  { id: "case-studies", label: "Case studies", accent: "var(--color-gold)" },
];
const num = (id: string) => navSections.findIndex((x) => x.id === id) + 1;

export default function PortfolioPage() {
  return (
    <>
      {/* ---------------- Intro ---------------- */}
      <section className="relative overflow-hidden pt-32 pb-14 md:pt-40">
        <Eclipse
          color="lavender"
          className="left-1/2 top-[-18%] h-[56vmin] w-[80vmin] -translate-x-1/2 opacity-35"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-(--spacing-gutter)">
          <Reveal>
            <span className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-teal/60" />
              Selected work
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-heading text-[clamp(2.6rem,8vw,6rem)] font-normal leading-[0.98] tracking-[-0.01em] text-hi">
              The work.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mid">
              A selection of brands we&apos;ve helped grow — websites, social
              content, video, and branding across e-commerce, medical, cannabis,
              capital, and non-profit.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionNav page="Portfolio" pageAccent="var(--color-lavender)" sections={navSections} />

      {/* ---------------- Client logos ---------------- */}
      <section
        id="clients"
        className="section-accent relative overflow-hidden bg-carbon py-20 md:py-28"
        style={{ ["--ac" as string]: "var(--color-silver)" }}
      >
        {/* A lit band — brighter than the surrounding sections. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 70% at 20% 30%, rgb(126 190 197 / 0.16), transparent 70%), radial-gradient(55% 70% at 80% 70%, rgb(183 148 223 / 0.16), transparent 70%), radial-gradient(40% 60% at 55% 10%, rgb(204 169 93 / 0.12), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeader
            n={num("clients")}
            label="Trusted by"
            title="Brands we work with."
            lede={`${clientLogos.length}+ businesses — from local favourites to national networks.`}
          />
        </div>
        <div className="relative mt-12 flex flex-col gap-8 md:gap-10">
          <LogoCarousel logos={clientLogos.slice(0, Math.ceil(clientLogos.length / 2))} seconds={55} />
          <LogoCarousel logos={clientLogos.slice(Math.ceil(clientLogos.length / 2))} seconds={60} reverse />
        </div>
      </section>

      {/* ---------------- Work by discipline ---------------- */}
      {workSections.map((sec, si) => {
        const items = work.filter((w) => w.tags.includes(sec.tag));
        if (items.length === 0) return null;
        return (
          <section
            key={sec.tag}
            id={sec.tag}
            className={`section-accent py-20 md:py-28 ${si % 2 === 0 ? "bg-ink" : "bg-void"}`}
            style={{ ["--ac" as string]: accentColor[sec.accent] }}
          >
            <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <SectionHeader
                  n={num(sec.tag)}
                  label="Selected work"
                  title={sec.title}
                  lede={sec.blurb}
                />
                <div className="shrink-0">
                  <ButtonLink href={`/services/${sec.service}`} variant="ghost" withArrow>
                    View service
                  </ButtonLink>
                </div>
              </div>

              <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((w) => (
                  <RevealItem key={`${sec.tag}-${w.name}-${w.type}`} className="h-full">
                    <WorkCard w={w} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        );
      })}

      {/* ---------------- Case studies ---------------- */}
      <section
        id="case-studies"
        className="section-accent py-20 md:py-28"
        style={{ ["--ac" as string]: "var(--color-gold)" }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              n={num("case-studies")}
              label="Case studies"
              title="The full story."
              lede="The problem, what we changed, and the numbers that moved."
            />
            <div className="shrink-0">
              <ButtonLink href="/case-studies" variant="ghost" withArrow>
                All case studies
              </ButtonLink>
            </div>
          </div>
        </div>
        <RevealGroup className="mx-auto mt-10 grid max-w-6xl gap-6 px-(--spacing-gutter) md:grid-cols-2">
          {caseStudies.map((c) => (
            <RevealItem key={c.href} className="h-full">
              <Link
                href={c.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink transition-colors duration-300 hover:border-[color:var(--ac)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={c.image}
                    alt={`${c.client} — case study by BLXCK Marketing`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 border-t border-white/[0.08] p-6 md:p-8">
                  <span className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--ac)" }}>
                    {c.sector}
                  </span>
                  <h3 className="text-2xl text-hi">{c.title}</h3>
                  <p className="leading-relaxed text-mid">{c.blurb}</p>
                  <span className="mt-auto pt-3 text-sm text-hi">
                    Read the case study{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-6 px-(--spacing-gutter) text-center">
          <p className="max-w-xl text-mid">Your brand could be next.</p>
          <ButtonLink href="/contact" variant="primary" withArrow>
            Start a project
          </ButtonLink>
        </Reveal>
      </section>
    </>
  );
}

function WorkCard({ w }: { w: WorkItem }) {
  const external = Boolean(w.url || w.video);
  const href = w.url ?? w.href ?? "/portfolio";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-void transition-colors duration-300 hover:border-[color:var(--ac)]"
    >
      <div
        className={`relative w-full overflow-hidden ${w.video ? "aspect-video" : "aspect-square"}`}
      >
        <Image
          src={w.image}
          alt={`${w.name} — ${w.type} by BLXCK Marketing`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {w.video && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
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
      <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] p-5">
        <div className="flex flex-col gap-1">
          <span className="font-heading text-base leading-snug text-hi">{w.name}</span>
          <span className="text-[0.68rem] uppercase tracking-[0.16em] text-lo">
            {w.type}
          </span>
        </div>
        <span className="shrink-0 text-sm transition-colors group-hover:text-hi" style={{ color: "var(--ac)" }}>
          {w.url ? "See it live ↗" : w.video ? "Watch ↗" : "→"}
        </span>
      </div>
    </a>
  );
}
