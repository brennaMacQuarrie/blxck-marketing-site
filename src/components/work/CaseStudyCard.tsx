import Image from "next/image";
import Link from "next/link";
import type { caseStudies } from "@/lib/content";

const accentColor: Record<string, string> = {
  teal: "var(--color-teal)",
  lavender: "var(--color-lavender)",
  gold: "var(--color-gold)",
};

/** Case study card: screenshot, sector, title, and a one-line result. */
export function CaseStudyCard({
  study: c,
  headingAs: Heading = "h2",
}: {
  study: (typeof caseStudies)[number];
  /** Match the page's outline: h2 under the page title, h3 under a section. */
  headingAs?: "h2" | "h3";
}) {
  return (
    <Link
      href={c.href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink transition-colors duration-300 hover:border-[color:var(--ac)]"
      style={{ ["--ac" as string]: accentColor[c.accent] }}
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
        <Heading className="font-heading text-2xl font-normal text-hi md:text-3xl">{c.title}</Heading>
        <p className="leading-relaxed text-mid">{c.blurb}</p>
        <span className="mt-auto pt-3 text-sm text-hi">
          Read the case study{" "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
