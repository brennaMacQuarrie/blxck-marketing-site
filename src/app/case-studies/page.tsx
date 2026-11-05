import type { Metadata } from "next";
import { caseStudies } from "@/lib/content";
import { site } from "@/lib/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eclipse } from "@/components/ui/Eclipse";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "How BLXCK Marketing has helped businesses grow — the problem, what we changed, and the numbers that moved.",
  openGraph: {
    title: `Case Studies — ${site.name}`,
    description: "The problem, what we changed, and the numbers that moved.",
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="space-bg-1 relative overflow-hidden pt-32 pb-14 md:pt-40">
        <Eclipse
          color="gold"
          className="left-1/2 top-[-18%] h-[56vmin] w-[80vmin] -translate-x-1/2 opacity-30"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-(--spacing-gutter)">
          <Reveal>
            <span className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-gold/60" />
              Our work
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-heading text-[clamp(2.6rem,8vw,6rem)] font-normal leading-[0.98] tracking-[-0.01em] text-hi">
              Case studies.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mid">
              The problem, what we changed, and the numbers that moved — told
              in plain language.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <RevealGroup className="mx-auto grid max-w-6xl gap-6 px-(--spacing-gutter) md:grid-cols-2">
          {caseStudies.map((c) => (
            <RevealItem key={c.href} className="h-full">
              <CaseStudyCard study={c} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-6 px-(--spacing-gutter) text-center">
          <p className="max-w-xl text-mid">More case studies on the way. In the meantime, browse the full portfolio.</p>
          <ButtonLink href="/portfolio" variant="ghost" withArrow>
            View portfolio
          </ButtonLink>
        </Reveal>
      </section>
    </>
  );
}
