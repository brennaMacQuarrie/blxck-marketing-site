import Link from "next/link";
import { serviceGroups } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const accentColor: Record<string, string> = {
  teal: "var(--color-teal)",
  lavender: "var(--color-lavender)",
  gold: "var(--color-gold)",
};

export function ServicesPreview() {
  return (
    <section className="border-t border-white/[0.06] bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Everything a growing brand needs, under one roof."
          />
          <div className="shrink-0">
            <ButtonLink href="/services" variant="ghost" withArrow>
              All services
            </ButtonLink>
          </div>
        </div>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {serviceGroups.map((g, idx) => (
            <RevealItem key={g.key} className="h-full">
              <Link
                href="/services"
                className="group relative flex h-full flex-col gap-5 bg-ink p-7 transition-colors duration-300 hover:bg-carbon"
                style={{ ["--ac" as string]: accentColor[g.accent] }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xs tabular-nums text-lo">
                    0{idx + 1}
                  </span>
                  <span
                    className="h-1.5 w-1.5 rounded-full opacity-40 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "var(--ac)" }}
                  />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-hi">
                  {g.title}
                </h3>
                <p className="text-sm leading-relaxed text-mid">{g.blurb}</p>
                <ul className="mt-auto flex flex-col gap-1.5 pt-4">
                  {g.items.map((it) => (
                    <li
                      key={it.name}
                      className="text-[0.8rem] text-lo transition-colors group-hover:text-mid"
                    >
                      {it.name}
                    </li>
                  ))}
                </ul>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
