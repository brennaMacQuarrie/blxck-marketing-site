import Link from "next/link";
import { nav, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-white/[0.06] bg-void">
      <div className="mx-auto max-w-6xl px-(--spacing-gutter)">
        {/* CTA */}
        <div className="flex flex-col items-start gap-8 py-20 md:py-28">
          <Reveal>
            <span className="eyebrow">Let&apos;s build something loud</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-4xl text-balance font-display text-4xl uppercase leading-[0.95] text-hi sm:text-6xl">
              Ready to become{" "}
              <span className="text-spectrum">impossible to ignore?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ButtonLink href="/contact" variant="primary" withArrow>
                Start a project
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost" withArrow={false}>
                Explore services
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Link + contact grid */}
        <div className="grid gap-12 border-t border-white/[0.06] py-14 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-heading text-lg tracking-[0.28em] text-hi"
            >
              BLXCK
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-lo">
              {site.tagline} A full-service marketing agency in {site.location}.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="eyebrow mb-1">Navigate</span>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-sm text-mid transition-colors hover:text-hi"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="eyebrow mb-1">Contact</span>
            <a
              href={`mailto:${site.contact.email}`}
              className="w-fit text-sm text-mid transition-colors hover:text-hi"
            >
              {site.contact.email}
            </a>
            <a
              href={`tel:${site.contact.phone}`}
              className="w-fit text-sm text-mid transition-colors hover:text-hi"
            >
              {site.contact.phoneDisplay}
            </a>
            <span className="max-w-[16rem] text-sm text-lo">
              {site.contact.address}
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] py-8 text-xs text-lo sm:flex-row sm:items-center">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span className="tracking-wide">Built in Edmonton, Alberta.</span>
        </div>
      </div>
    </footer>
  );
}
