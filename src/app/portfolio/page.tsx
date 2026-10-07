import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects, work, workSections, clientLogos } from "@/lib/content";
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
  { id: "industries", label: "Industries", accent: "var(--color-teal)" },
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
        className="section-accent bg-void py-20 md:py-24"
        style={{ ["--ac" as string]: "var(--color-silver)" }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeader n={num("clients")} label="Trusted by" title="Brands we work with." />
          <Reveal className="mt-10">
            <LogoCarousel logos={clientLogos} />
          </Reveal>
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

      {/* ---------------- Brands & industries ---------------- */}
      <section
        id="industries"
        className="section-accent py-20 md:py-28"
        style={{ ["--ac" as string]: "var(--color-teal)" }}
      >
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <SectionHeader
            n={num("industries")}
            label="Across industries"
            title="Brands we've grown."
          />
        </div>
        <RevealGroup className="mx-auto mt-10 grid max-w-6xl gap-5 px-(--spacing-gutter) sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <RevealItem key={p.name} className="h-full">
              <Link
                href="/contact"
                className="group relative block overflow-hidden rounded-2xl border border-white/[0.08]"
                style={{ ["--ac" as string]: accentColor[p.accent] }}
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={p.image}
                    alt={`${p.name} — ${p.sector} work by BLXCK Marketing`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  {/* accent line that grows on hover */}
                  <span
                    className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 ease-out group-hover:w-full"
                    style={{ background: "var(--ac)" }}
                  />
                </div>

                {/* sector badge */}
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-mid backdrop-blur-sm">
                  {p.sector}
                </span>

                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-6">
                  <h3 className="font-heading text-xl text-hi md:text-2xl">
                    {p.name}
                  </h3>
                  <p className="max-h-0 overflow-hidden text-sm leading-relaxed text-mid opacity-0 transition-all duration-500 ease-out group-hover:max-h-24 group-hover:opacity-100">
                    {p.blurb}
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-6 px-(--spacing-gutter) text-center">
          <p className="max-w-xl text-mid">
            Your brand could be next on this list.
          </p>
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
