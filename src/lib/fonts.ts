import localFont from "next/font/local";

/**
 * Brand type system for BLXCK Marketing.
 *
 * - Space Age  -> big display / H1 (echoes the neon logo wordmark)
 * - Milker     -> H2–H6 section headings
 * - Arial      -> body copy (system font, wired via CSS var + stack)
 *
 * Font files live in /public/fonts. next/font/local self-hosts them
 * (no external requests, no layout shift) and exposes a CSS variable.
 */

export const spaceAge = localFont({
  src: [
    { path: "../../public/fonts/SpaceAge.otf", weight: "400", style: "normal" },
  ],
  variable: "--font-space-age",
  display: "swap",
  // Keep layout stable while the display face loads.
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const milker = localFont({
  src: [
    { path: "../../public/fonts/Milker.otf", weight: "400", style: "normal" },
  ],
  variable: "--font-milker",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  adjustFontFallback: false,
});
