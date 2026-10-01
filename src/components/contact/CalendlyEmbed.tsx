"use client";

import { InlineWidget } from "react-calendly";

/**
 * Embedded Calendly scheduler, themed to the brand. Pass the booking URL
 * (from NEXT_PUBLIC_CALENDLY_URL via site.calendlyUrl).
 */
export function CalendlyEmbed({ url }: { url: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-carbon">
      <InlineWidget
        url={url}
        styles={{ height: "700px", minWidth: "280px" }}
        pageSettings={{
          backgroundColor: "0a0b0f",
          primaryColor: "7ebec5",
          textColor: "f4f5f7",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          hideGdprBanner: true,
        }}
      />
    </div>
  );
}
