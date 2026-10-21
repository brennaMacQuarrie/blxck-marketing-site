"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/site";
import { serviceGroups, slugify, caseStudies, workSections } from "@/lib/content";
import { Logo } from "@/components/layout/Logo";

const accentColor: Record<string, string> = {
  teal: "var(--color-teal)",
  lavender: "var(--color-lavender)",
  gold: "var(--color-gold)",
};

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Which desktop menu is open ("services" | "work"), and which mobile
  // accordion section is expanded.
  const [menu, setMenu] = useState<null | "services" | "work">(null);
  const [mobileSection, setMobileSection] = useState<null | "services" | "work">(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
    setMobileSection(null);
  }, [pathname]);

  const openMenu = (m: "services" | "work") => {
    clearTimeout(closeTimer.current);
    setMenu(m);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setMenu(null), 120);
  };
  const menuFor = (label: string) =>
    label === "Services" ? "services" : label === "Our work" ? "work" : null;
  const isActive = (label: string, href: string) =>
    label === "Our work"
      ? ["/case-studies", "/portfolio", "/optometrists-case-study"].some((p) =>
          pathname.startsWith(p),
        )
      : pathname.startsWith(href);
  const chevron = (on: boolean) => (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={`transition-transform duration-300 ${on ? "rotate-180" : ""}`}
    >
      <path
        d="M2.5 4.5L6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open || menu
            ? "border-b border-white/10 bg-void/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-(--spacing-gutter)">
          <Link
            href="/"
            aria-label="BLXCK Marketing home"
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <Logo priority height={30} />
          </Link>

          {/* Desktop links — headings in Space Age */}
          <ul className="hidden items-center gap-9 md:flex">
            {nav.map((item) => {
              const active = isActive(item.label, item.href);
              const m = menuFor(item.label);
              const cls = `flex items-center gap-1.5 font-display text-[0.95rem] lowercase tracking-[0.02em] transition-colors duration-200 ${
                active || (m && menu === m) ? "text-hi" : "text-mid hover:text-hi"
              }`;
              if (m) {
                return (
                  <li
                    key={item.href}
                    onMouseEnter={() => openMenu(m)}
                    onMouseLeave={closeMenu}
                  >
                    <Link href={item.href} className={cls} aria-expanded={menu === m}>
                      {item.label}
                      {chevron(menu === m)}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link href={item.href} className={cls}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-px w-6 bg-hi transition-all duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-hi transition-all duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        {/* Desktop Services mega-menu */}
        <div
          onMouseEnter={() => openMenu("services")}
          onMouseLeave={closeMenu}
          className={`absolute inset-x-0 top-full hidden border-b border-white/10 bg-void/[0.98] backdrop-blur-xl transition-all duration-300 md:block ${
            menu === "services"
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="mx-auto grid max-w-6xl grid-cols-4 gap-8 px-(--spacing-gutter) py-9">
            {serviceGroups.map((g) => (
              <div key={g.key}>
                <div className="mb-4 flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: accentColor[g.accent] }}
                  />
                  <span className="text-xs uppercase tracking-[0.18em] text-lo">
                    {g.title}
                  </span>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {g.items.map((it) => (
                    <li key={it.name}>
                      <Link
                        href={`/services/${slugify(it.name)}`}
                        className="text-[0.92rem] text-mid transition-colors duration-200 hover:text-hi"
                      >
                        {it.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.06]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-(--spacing-gutter) py-4">
              <Link
                href="/services"
                className="group flex items-center gap-1.5 text-sm text-hi"
              >
                All services
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href={site.calculatorUrl}
                className="group flex items-center gap-1.5 text-sm text-mid transition-colors hover:text-hi"
              >
                Build a custom plan
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop "Our work" menu */}
        <div
          onMouseEnter={() => openMenu("work")}
          onMouseLeave={closeMenu}
          className={`absolute inset-x-0 top-full hidden border-b border-white/10 bg-void/[0.98] backdrop-blur-xl transition-all duration-300 md:block ${
            menu === "work"
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="mx-auto grid max-w-6xl grid-cols-[1.4fr_1fr] gap-12 px-(--spacing-gutter) py-9">
            <div>
              <Link href="/case-studies" className="mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-xs uppercase tracking-[0.18em] text-lo transition-colors hover:text-hi">
                  Case studies
                </span>
              </Link>
              <ul className="flex flex-col gap-3">
                {caseStudies.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="group flex flex-col gap-0.5">
                      <span className="text-[0.92rem] text-mid transition-colors group-hover:text-hi">
                        {c.title}
                      </span>
                      <span className="text-xs text-lo">{c.sector}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link href="/portfolio" className="mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-lavender" />
                <span className="text-xs uppercase tracking-[0.18em] text-lo transition-colors hover:text-hi">
                  Portfolio
                </span>
              </Link>
              <ul className="flex flex-col gap-2.5">
                {workSections.map((w) => (
                  <li key={w.tag}>
                    <Link
                      href={`/portfolio#${w.tag}`}
                      className="text-[0.92rem] text-mid transition-colors duration-200 hover:text-hi"
                    >
                      {w.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.06]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-(--spacing-gutter) py-4">
              <Link href="/case-studies" className="group flex items-center gap-1.5 text-sm text-hi">
                All case studies
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/portfolio"
                className="group flex items-center gap-1.5 text-sm text-mid transition-colors hover:text-hi"
              >
                Full portfolio
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-void/95 px-(--spacing-gutter) pb-12 pt-24 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col">
              {nav.map((item) => {
                const m = menuFor(item.label);
                if (!m) {
                  return (
                    <li key={item.href} className="border-b border-white/[0.06]">
                      <Link
                        href={item.href}
                        className="block py-3 font-display text-3xl lowercase text-hi"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const expanded = mobileSection === m;
                return (
                  <li key={item.href} className="border-b border-white/[0.06]">
                    <button
                      onClick={() => setMobileSection(expanded ? null : m)}
                      className="flex w-full items-center justify-between py-3 text-left"
                      aria-expanded={expanded}
                    >
                      <span className="font-display text-3xl lowercase text-hi">
                        {item.label}
                      </span>
                      <span
                        className={`text-mid transition-transform duration-300 ${
                          expanded ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          {m === "services" ? (
                            <div className="flex flex-col gap-5 pb-5 pt-1">
                              {serviceGroups.map((g) => (
                                <div key={g.key}>
                                  <div className="mb-2 flex items-center gap-2">
                                    <span
                                      className="h-1.5 w-1.5 rounded-full"
                                      style={{ background: accentColor[g.accent] }}
                                    />
                                    <span className="text-xs uppercase tracking-[0.18em] text-lo">
                                      {g.title}
                                    </span>
                                  </div>
                                  <ul className="flex flex-col gap-1 pl-3.5">
                                    {g.items.map((it) => (
                                      <li key={it.name}>
                                        <Link
                                          href={`/services/${slugify(it.name)}`}
                                          className="block py-1 text-sm text-mid hover:text-hi"
                                        >
                                          {it.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                              <Link href="/services" className="pl-3.5 text-sm text-teal">
                                All services →
                              </Link>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-5 pb-5 pt-1">
                              <div>
                                <div className="mb-2 flex items-center gap-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                                  <span className="text-xs uppercase tracking-[0.18em] text-lo">
                                    Case studies
                                  </span>
                                </div>
                                <ul className="flex flex-col gap-1 pl-3.5">
                                  {caseStudies.map((c) => (
                                    <li key={c.href}>
                                      <Link href={c.href} className="block py-1 text-sm text-mid hover:text-hi">
                                        {c.title}
                                      </Link>
                                    </li>
                                  ))}
                                  <li>
                                    <Link href="/case-studies" className="block py-1 text-sm text-teal">
                                      All case studies →
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              <div>
                                <div className="mb-2 flex items-center gap-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-lavender" />
                                  <span className="text-xs uppercase tracking-[0.18em] text-lo">
                                    Portfolio
                                  </span>
                                </div>
                                <ul className="flex flex-col gap-1 pl-3.5">
                                  {workSections.map((w) => (
                                    <li key={w.tag}>
                                      <Link
                                        href={`/portfolio#${w.tag}`}
                                        className="block py-1 text-sm text-mid hover:text-hi"
                                      >
                                        {w.title}
                                      </Link>
                                    </li>
                                  ))}
                                  <li>
                                    <Link href="/portfolio" className="block py-1 text-sm text-teal">
                                      Full portfolio →
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
            <div className="mt-10 flex flex-col gap-2 text-sm text-lo">
              <a href={`mailto:${site.contact.email}`} className="hover:text-hi">
                {site.contact.email}
              </a>
              <a href={`tel:${site.contact.phone}`} className="hover:text-hi">
                {site.contact.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
