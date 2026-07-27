import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Standard section header: an uppercase eyebrow above a Milker heading,
 * with an optional lede paragraph. Reveals on scroll.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-5 ${alignment} ${className}`}>
      {eyebrow && (
        <span className="eyebrow flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-teal/60" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl leading-[1.05] text-hi sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {lede && (
        <p className="max-w-2xl text-base leading-relaxed text-mid sm:text-lg">
          {lede}
        </p>
      )}
    </Reveal>
  );
}
