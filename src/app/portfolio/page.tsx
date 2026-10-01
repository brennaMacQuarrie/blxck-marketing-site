import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/lib/content";
import { site } from "@/lib/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eclipse } from "@/components/ui/Eclipse";

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

export default function PortfolioPage() {
  return (
    <>
      {/* ---------------- Intro ---------------- */}
      <section className="relative overflow-hidden pt-28 pb-14 md:pt-36">
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
            <h1 className="mt-6 font-body text-[clamp(2.6rem,8vw,6rem)] font-bold leading-[0.98] tracking-[-0.03em] text-hi">
              The work.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mid">
              A selection of brands we&apos;ve helped grow — across e-commerce,
              medical, cannabis, capital, and non-profit. Strategy, creative, and
              media, built to perform.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Grid ---------------- */}
      <section className="pb-24 md:pb-32">
        <RevealGroup className="mx-auto grid max-w-6xl gap-5 px-(--spacing-gutter) sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <RevealItem key={p.name} className="h-full">
              <a
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
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  {/* accent line that grows on hover */}
                  <span
                    className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 ease-out group-hover:w-full"
                    style={{ background: "var(--ac)" }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
                  <h2 className="font-heading text-xl text-hi md:text-2xl">
                    {p.name}
                  </h2>
                  <span
                    className="text-[0.7rem] uppercase tracking-[0.18em] text-mid"
                  >
                    {p.sector}
                  </span>
                </div>
              </a>
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
