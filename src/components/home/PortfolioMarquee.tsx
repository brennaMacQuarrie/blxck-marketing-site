import Link from "next/link";
import { projects } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

function Row({
  reverse = false,
  items,
}: {
  reverse?: boolean;
  items: typeof projects;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden py-1.5">
      <div
        className={`flex shrink-0 items-center gap-6 pr-6 ${
          reverse
            ? "animate-[marquee-r_48s_linear_infinite]"
            : "animate-[marquee-l_48s_linear_infinite]"
        } motion-reduce:animate-none`}
      >
        {doubled.map((p, i) => (
          <span
            key={`${p.name}-${i}`}
            className="flex items-center gap-6 whitespace-nowrap"
          >
            <span className="font-heading text-2xl uppercase tracking-wide text-lo/60 sm:text-3xl">
              {p.name}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/15" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}

export function PortfolioMarquee() {
  const half = Math.ceil(projects.length / 2);
  return (
    <section className="border-t border-white/[0.06] bg-void py-24 md:py-32">
      <div className="mx-auto mb-16 flex max-w-6xl flex-col justify-between gap-8 px-(--spacing-gutter) md:flex-row md:items-end">
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

      <div className="flex flex-col gap-3 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <Row items={projects.slice(0, half)} />
        <Row items={projects.slice(half)} reverse />
      </div>

      <Link href="/portfolio" className="sr-only">
        View the full portfolio
      </Link>

      <style>{`
        @keyframes marquee-l { to { transform: translateX(-50%); } }
        @keyframes marquee-r { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  );
}
