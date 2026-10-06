import Image from "next/image";

/**
 * The BLXCK MARKETING wordmark, used as supplied (/logos/blxck-wordmark.png).
 * The file carries a lot of transparent glow padding, so we render it larger
 * inside a shorter clip box — the file is untouched; only its outer glow halo
 * is cropped by CSS so the one-line wordmark reads at a sensible size.
 *
 * `height` = visible box height in px. Width tracks the wordmark's ratio.
 */
export function Logo({
  height = 30,
  priority = false,
  className = "",
}: {
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  // The actual lettering fills ~55% of the box height; scale up to suit.
  const imgH = Math.round(height / 0.55);
  const imgW = Math.round(imgH * (2000 / 500));

  return (
    <span
      className={`relative block overflow-hidden ${className}`}
      style={{ height: `${height}px`, width: `${imgW}px` }}
      aria-hidden={false}
    >
      <Image
        src="/logos/blxck-wordmark.png"
        alt="BLXCK Marketing"
        width={2000}
        height={500}
        priority={priority}
        className="absolute left-0 top-1/2 max-w-none -translate-y-1/2"
        style={{ height: `${imgH}px`, width: `${imgW}px` }}
      />
    </span>
  );
}
