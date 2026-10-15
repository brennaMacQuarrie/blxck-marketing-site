import type { Trend } from "@/lib/case-studies/optometrists";

/**
 * Green trend glyph: ▲ for a metric that went up, ▼ for one that went down.
 * Only used on improved metrics, so the colour always means "better".
 */
export function TrendMark({ trend, size = "sm" }: { trend: Trend; size?: "sm" | "lg" }) {
  const px = size === "lg" ? 22 : 12;
  const label = trend === "up" ? "up" : "down";
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 12 12"
      role="img"
      aria-label={label}
      className="shrink-0 text-good"
      style={{ transform: trend === "down" ? "rotate(180deg)" : undefined }}
    >
      <path d="M6 1.5 11 10H1z" fill="currentColor" />
    </svg>
  );
}
