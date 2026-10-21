import Image from "next/image";
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

        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {serviceGroups.map((g) => (
            <RevealItem key={g.key} className="h-full">
              <Link
                href={`/services#${g.key}`}
                className="wwd-card group flex h-full flex-col gap-6 rounded-2xl bg-ink p-7"
                style={{ ["--ac" as string]: accentColor[g.accent] }}
              >
                <Image
                  src={`/icons/space-${g.key}.webp`}
                  alt=""
                  aria-hidden
                  width={96}
                  height={96}
                  className="wwd-icon h-20 w-auto object-contain object-left"
                />
                <h3 className="font-display text-xl font-normal lowercase text-hi">
                  {g.title}
                </h3>

                <ul className="flex flex-col divide-y divide-white/[0.06]">
                  {g.items.map((it) => (
                    <li key={it.name} className="py-3 first:pt-0">
                      <span className="text-[0.95rem] text-hi">{it.name}</span>
                      <p className="mt-1 text-[0.82rem] leading-relaxed text-mid">
                        {it.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <style>{`
          /* Animatable angle for the travelling border. */
          @property --wwd-angle {
            syntax: "<angle>";
            initial-value: 0deg;
            inherits: false;
          }
          .wwd-card {
            position: relative;
            isolation: isolate;
            border: 1px solid rgb(255 255 255 / 0.08);
            transition: background-color .4s ease, box-shadow .5s ease, transform .4s ease;
          }
          /* Gradient ring, masked to the border, that travels around on hover. */
          .wwd-card::before {
            content: "";
            position: absolute;
            inset: -1px;
            border-radius: inherit;
            padding: 1px;
            background: conic-gradient(
              from var(--wwd-angle),
              transparent 0deg,
              var(--ac) 60deg,
              #fff 90deg,
              var(--ac) 120deg,
              transparent 200deg,
              transparent 360deg
            );
            -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
            opacity: 0;
            transition: opacity .4s ease;
            pointer-events: none;
          }
          .wwd-card:hover,
          .wwd-card:focus-visible {
            background-color: var(--color-void);
            transform: translateY(-3px);
            box-shadow:
              0 0 0 1px color-mix(in oklab, var(--ac) 25%, transparent),
              0 0 34px -6px color-mix(in oklab, var(--ac) 55%, transparent);
          }
          .wwd-card:hover::before,
          .wwd-card:focus-visible::before {
            opacity: 1;
            animation: wwd-spin 3.2s linear infinite;
          }
          .wwd-icon {
            opacity: .85;
            transition: transform .5s cubic-bezier(.16,1,.3,1), filter .5s ease, opacity .5s ease;
          }
          .wwd-card:hover .wwd-icon {
            opacity: 1;
            transform: translateY(-4px) rotate(-4deg);
            filter: drop-shadow(0 0 10px color-mix(in oklab, var(--ac) 80%, transparent));
          }
          @keyframes wwd-spin { to { --wwd-angle: 360deg; } }
          @media (prefers-reduced-motion: reduce) {
            .wwd-card:hover::before { animation: none; }
            .wwd-card:hover { transform: none; }
          }
        `}</style>
      </div>
    </section>
  );
}
