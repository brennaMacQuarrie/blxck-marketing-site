import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { caseStudies, work, workSections } from "@/lib/content";
import { ogImage, site } from "@/lib/site";
import { workMedia } from "@/lib/work-media";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eclipse } from "@/components/ui/Eclipse";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";

export const metadata: Metadata = {
  title: "Our Work: Case Studies & Portfolio",
  description:
    "Case studies and portfolio from BLXCK Marketing, an Edmonton marketing agency: the numbers we've moved and the work behind them.",
  alternates: { canonical: "/our-work" },
  openGraph: {
    images: [ogImage],
    title: `Our Work — ${site.name}`,
    description: "Case studies and portfolio from BLXCK Marketing.",
  },
};

/** Each portfolio category with the first piece of work as its preview. */
const categories = workSections.flatMap((sec) => {
  const first = work.find((w) => w.tags.includes(sec.tag));
  return first ? [{ ...sec, first }] : [];
});

export default function OurWorkPage() {
  return (
    <>
      <section className="space-bg-1 relative overflow-hidden pt-32 pb-14 md:pt-40">
        <Eclipse
          color="teal"
          className="left-1/2 top-[-18%] h-[56vmin] w-[80vmin] -translate-x-1/2 opacity-30"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-(--spacing-gutter)">
          <Reveal fade={false}>
            <h1 className="font-heading text-[clamp(2.6rem,8vw,6rem)] font-normal leading-[0.98] tracking-[-0.01em] text-hi">
              Our work.
            </h1>
          </Reveal>
          <Reveal fade={false} delay={0.05}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mid">
              Read how the numbers moved in our case studies, or browse the work
              itself in the portfolio.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="case-studies" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] text-hi">Case studies.</h2>
            <ButtonLink href="/case-studies" variant="ghost" withArrow>
              All case studies
            </ButtonLink>
          </Reveal>
          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((c) => (
              <RevealItem key={c.href} className="h-full">
                <CaseStudyCard study={c} headingAs="h3" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="portfolio" className="border-t border-white/[0.06] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] text-hi">Portfolio.</h2>
            <ButtonLink href="/portfolio" variant="ghost" withArrow>
              Full portfolio
            </ButtonLink>
          </Reveal>
          <RevealGroup className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {categories.map((sec) => (
              <RevealItem key={sec.tag} className="h-full">
                <Link
                  href={`/portfolio#${sec.tag}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-void transition-colors duration-300 hover:border-white/30"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-carbon">
                    <Image
                      src={sec.first.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className={`${workMedia(sec.first).img} transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
                    />
                  </div>
                  <span className="flex items-center justify-between gap-3 border-t border-white/[0.08] px-4 py-3.5 text-sm font-semibold text-hi">
                    {sec.short}
                    <span
                      aria-hidden
                      className="text-lo transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
