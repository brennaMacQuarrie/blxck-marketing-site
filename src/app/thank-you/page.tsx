import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Eclipse } from "@/components/ui/Eclipse";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thanks for getting in touch with BLXCK Marketing.",
  robots: { index: false, follow: false },
};

/** Where the contact form lands after a successful send (also the conversion page for GTM). */
export default function ThankYouPage() {
  return (
    <section className="space-bg-1 relative flex min-h-[80vh] items-center overflow-hidden pt-32 pb-24 md:pt-40">
      <Eclipse
        color="teal"
        className="left-1/2 top-[-18%] h-[56vmin] w-[80vmin] -translate-x-1/2 opacity-30"
      />
      <div className="relative z-10 mx-auto w-full max-w-3xl px-(--spacing-gutter)">
        <span className="eyebrow">message sent</span>
        <h1 className="mt-5 font-heading text-[clamp(2.6rem,8vw,5.5rem)] font-normal leading-[0.98] text-hi">
          Thank you.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-mid">
          We&apos;ve got your message and will be in touch within one business day.
          For anything urgent, call{" "}
          <a href={`tel:${site.contact.phone}`} className="text-hi underline-offset-4 hover:underline">
            {site.contact.phoneDisplay}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/our-work" variant="primary" withArrow>
            See our work
          </ButtonLink>
          <ButtonLink href="/" variant="ghost" withArrow={false}>
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
