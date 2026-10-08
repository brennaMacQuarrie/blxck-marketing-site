import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { Eclipse } from "@/components/ui/Eclipse";
import { PlanBuilder } from "@/components/plan-builder/PlanBuilder";

export const metadata: Metadata = {
  title: "Custom Plan Builder",
  description:
    "Build your marketing plan with BLXCK. Pick the services you need, set the details, and see your monthly price update live — with automatic bundle discounts.",
  openGraph: {
    title: `Custom Plan Builder — ${site.name}`,
    description:
      "Pick your services and see your monthly marketing investment update live.",
  },
};

export default function CustomPlanBuilderPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-14">
        <Eclipse
          color="lavender"
          className="right-[-6%] top-[-18%] h-[52vmin] w-[52vmin] opacity-35"
        />
        <Eclipse
          color="teal"
          className="left-[-8%] top-[10%] h-[40vmin] w-[40vmin] opacity-25"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-(--spacing-gutter)">
          <Reveal>
            <span className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-teal/60" />
              Custom plan builder
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-heading text-[clamp(2.4rem,6.5vw,5rem)] font-normal leading-[1.02] tracking-[-0.01em] text-hi">
              Build your{" "}
              <span className="text-spectrum">marketing plan.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <PlanBuilder />
    </>
  );
}
