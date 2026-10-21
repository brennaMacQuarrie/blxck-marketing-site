"use client";

import { useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

const accentColor: Record<string, string> = {
  teal: "var(--color-teal)",
  lavender: "var(--color-lavender)",
  gold: "var(--color-gold)",
  silver: "var(--color-silver)",
};

export function PortfolioShowcase() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="border-t border-white/[0.06] bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Brands we've made impossible to ignore."
          />
          <div className="shrink-0">
            <ButtonLink href="/portfolio" variant="ghost" withArrow>
              View portfolio
            </ButtonLink>
          </div>
        </div>

        {/* Desktop: 3×3 grid over one full-bleed image. Hovering a project
            swaps the background to it; the hovered cell goes dark. */}
        <div
          className="relative mt-14 hidden overflow-hidden rounded-2xl border border-white/10 bg-carbon md:block"
          onMouseLeave={() => setHovered(null)}
        >
          {projects.map((p, i) => (
            <Image
              key={p.name}
              src={p.image}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 1152px) 1152px, 100vw"
              priority={i === 0}
              className={`object-cover transition-all duration-700 ease-out ${
                active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-black/30" />

          <ul className="relative grid grid-cols-3">
            {projects.map((p, i) => {
              const on = hovered === i;
              return (
                <li
                  key={p.name}
                  className="border-white/15 [&:not(:nth-child(3n))]:border-r [&:nth-child(n+4)]:border-t"
                >
                  <a
                    href={p.href ?? "/portfolio"}
                    onMouseEnter={() => {
                      setHovered(i);
                      setActive(i);
                    }}
                    onFocus={() => {
                      setHovered(i);
                      setActive(i);
                    }}
                    className={`flex aspect-[16/10] flex-col items-center justify-between px-6 pb-6 pt-10 text-center transition-colors duration-500 ${
                      on ? "bg-void/85 backdrop-blur-sm" : "bg-transparent"
                    }`}
                    style={{ ["--ac" as string]: accentColor[p.accent] }}
                  >
                    <span className="flex flex-col items-center gap-2 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
                      <span
                        className="text-[0.7rem] uppercase tracking-[0.22em]"
                        style={{ color: "var(--ac)" }}
                      >
                        {p.sector}
                      </span>
                      <span className="text-lg font-semibold text-hi lg:text-xl">
                        {p.name}
                      </span>
                    </span>
                    <span
                      className={`text-xs uppercase tracking-[0.2em] text-hi transition-all duration-500 ${
                        on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                      }`}
                    >
                      View more →
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile: stacked image cards */}
        <ul className="mt-10 grid gap-4 md:hidden">
          {projects.map((p) => (
            <li key={p.name}>
              <a
                href={p.href ?? "/portfolio"}
                className="relative block overflow-hidden rounded-xl border border-white/10"
                style={{ ["--ac" as string]: accentColor[p.accent] }}
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={p.image}
                    alt={`${p.name} — ${p.sector} work by BLXCK Marketing`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <span className="text-lg font-semibold text-hi">{p.name}</span>
                  <span
                    className="text-[0.68rem] uppercase tracking-[0.2em]"
                    style={{ color: "var(--ac)" }}
                  >
                    {p.sector}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
