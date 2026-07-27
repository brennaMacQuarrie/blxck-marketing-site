import { auditOffer } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export function AuditBanner() {
  return (
    <section className="border-t border-white/[0.06] bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
        <Reveal className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-carbon px-8 py-14 md:px-16 md:py-20">
          {/* One restrained gold wash. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.12] blur-3xl"
            style={{ background: "var(--color-gold)" }}
          />
          <div className="relative flex flex-col items-start gap-6">
            <span className="eyebrow">Start with clarity</span>
            <h2 className="max-w-2xl text-balance font-heading text-3xl leading-[1.12] text-hi sm:text-4xl md:text-5xl">
              {auditOffer.headline} —{" "}
              <span className="text-gold">{auditOffer.price}</span>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-mid">
              {auditOffer.body}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-5">
              <ButtonLink href="/contact" variant="gold" withArrow>
                Book your audit
              </ButtonLink>
              <span className="text-xs uppercase tracking-[0.2em] text-lo">
                {auditOffer.note}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
