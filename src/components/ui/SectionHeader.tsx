import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Numbered, colour-coded section header: accent chip + label, then a
 * Space Age title. Expects `--ac` to be set on an ancestor (see
 * `.section-accent` in globals.css).
 */
export function SectionHeader({
  n,
  label,
  title,
  lede,
  className = "",
}: {
  n: number;
  label: string;
  title?: ReactNode;
  lede?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="section-chip">{String(n).padStart(2, "0")}</span>
        <span className="eyebrow" style={{ color: "var(--ac)" }}>
          {label}
        </span>
      </div>
      {title && (
        <h2 className="text-balance text-3xl leading-[1.08] text-hi sm:text-4xl">
          {title}
        </h2>
      )}
      {lede && <p className="max-w-2xl leading-relaxed text-mid">{lede}</p>}
    </Reveal>
  );
}
