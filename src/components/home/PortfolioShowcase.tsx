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

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:gap-16">
          {/* Project list */}
          <ul className="flex flex-col">
            {projects.map((p, i) => {
              const isActive = active === i;
              return (
                <li key={p.name}>
                  <a
                    href="/portfolio"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group block border-t border-white/[0.08] py-5 md:py-6"
                    style={{ ["--ac" as string]: accentColor[p.accent] }}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline gap-4 md:gap-6">
                        <span
                          className="text-xs tabular-nums transition-colors duration-300"
                          style={{ color: isActive ? "var(--ac)" : "var(--color-lo)" }}
                        >
                          0{i + 1}
                        </span>
                        <h3
                          className={`text-2xl font-semibold tracking-tight transition-all duration-300 md:text-4xl ${
                            isActive
                              ? "translate-x-1 text-hi lg:translate-x-2"
                              : "text-lo group-hover:text-mid"
                          }`}
                        >
                          {p.name}
                        </h3>
                      </div>
                      <span className="hidden shrink-0 text-xs uppercase tracking-[0.2em] text-lo sm:block">
                        {p.sector}
                      </span>
                    </div>

                    {/* Inline image for touch / small screens */}
                    <div className="mt-4 overflow-hidden rounded-xl border border-white/10 lg:hidden">
                      <div className="relative aspect-video w-full">
                        <Image
                          src={p.image}
                          alt={`${p.name} — ${p.sector} work by BLXCK Marketing`}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
            <li className="border-t border-white/[0.08]" aria-hidden />
          </ul>

          {/* Sticky crossfading preview (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-25 blur-3xl transition-colors duration-500"
                style={{ background: accentColor[projects[active].accent] }}
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-carbon">
                {projects.map((p, i) => (
                  <Image
                    key={p.name}
                    src={p.image}
                    alt={`${p.name} — ${p.sector} work by BLXCK Marketing`}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    priority={i === 0}
                    className={`object-cover transition-all duration-700 ease-out ${
                      active === i
                        ? "scale-100 opacity-100"
                        : "scale-105 opacity-0"
                    }`}
                  />
                ))}
                {/* legibility gradient + caption */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <span className="font-heading text-xl text-hi">
                    {projects[active].name}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-mid">
                    {projects[active].sector}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
