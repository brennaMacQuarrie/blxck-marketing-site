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
    <section className="border-t border-white/[0.06] bg-void py-24 md:py-32">
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

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-4">
          {serviceGroups.map((g, idx) => (
            <RevealItem key={g.key} className="h-full">
              <div
                className="flex h-full flex-col gap-6 bg-ink p-7"
                style={{ ["--ac" as string]: accentColor[g.accent] }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold tracking-tight text-hi">
                    {g.title}
                  </h3>
                  <span className="flex items-center gap-2 text-xs tabular-nums text-lo">
                    0{idx + 1}
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--ac)" }}
                    />
                  </span>
                </div>

                <ul className="flex flex-col divide-y divide-white/[0.06]">
                  {g.items.map((it) => (
                    <li key={it.name} className="group/it py-3 first:pt-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-px w-0 transition-all duration-300 group-hover/it:w-3"
                          style={{ background: "var(--ac)" }}
                        />
                        <span className="text-[0.95rem] text-hi">{it.name}</span>
                      </div>
                      <p className="mt-1 text-[0.8rem] leading-relaxed text-lo">
                        {it.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
