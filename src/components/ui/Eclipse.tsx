/**
 * Decorative "event-horizon" glow. Purely visual, aria-hidden.
 * Color maps to a brand accent; position/size are controlled via className.
 */
const colorVar: Record<string, string> = {
  teal: "var(--color-teal)",
  lavender: "var(--color-lavender)",
  gold: "var(--color-gold)",
  silver: "var(--color-silver)",
};

export function Eclipse({
  color = "teal",
  className = "",
}: {
  color?: keyof typeof colorVar;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`eclipse ${className}`}
      style={{ ["--eclipse-color" as string]: colorVar[color] }}
    />
  );
}
