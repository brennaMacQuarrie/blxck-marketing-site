"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/site";
import { serviceGroups, slugify } from "@/lib/content";
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
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
    setServicesOpen(false);
    setMobileServices(false);
  }, [pathname]);

  const openServices = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServices = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open || servicesOpen
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

          {/* Desktop links — centered */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.label === "Services") {
                return (
                  <li
                    key={item.href}
                    onMouseEnter={openServices}
                    onMouseLeave={closeServices}
                  >
                    <Link
                      href="/services"
                      className={`flex items-center gap-1.5 text-[0.9rem] transition-colors duration-200 ${
                        active ? "text-hi" : "text-lo hover:text-hi"
                      }`}
                      aria-expanded={servicesOpen}
                    >
                      Services
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden
                        className={`transition-transform duration-300 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M2.5 4.5L6 8l3.5-3.5"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-[0.9rem] transition-colors duration-200 ${
                      active ? "text-hi" : "text-lo hover:text-hi"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="rounded-full bg-hi px-4 py-2 text-[0.85rem] font-medium text-void transition-colors duration-200 hover:bg-white"
            >
              Let&apos;s talk
            </Link>
          </div>

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
          onMouseEnter={openServices}
          onMouseLeave={closeServices}
          className={`absolute inset-x-0 top-full hidden border-b border-white/10 bg-void/95 backdrop-blur-xl transition-all duration-300 md:block ${
            servicesOpen
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
                href="/medical-marketing"
                className="group flex items-center gap-1.5 text-sm text-mid transition-colors hover:text-hi"
              >
                Medical Marketing Solutions
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
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
                if (item.label === "Services") {
                  return (
                    <li key={item.href} className="border-b border-white/[0.06]">
                      <button
                        onClick={() => setMobileServices((v) => !v)}
                        className="flex w-full items-center justify-between py-3 text-left"
                        aria-expanded={mobileServices}
                      >
                        <span className="font-display text-3xl uppercase text-hi">
                          Services
                        </span>
                        <span
                          className={`text-mid transition-transform duration-300 ${
                            mobileServices ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileServices && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
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
                              <Link
                                href="/medical-marketing"
                                className="pl-3.5 text-sm text-teal"
                              >
                                Medical Marketing Solutions →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }
                return (
                  <li key={item.href} className="border-b border-white/[0.06]">
                    <Link
                      href={item.href}
                      className="block py-3 font-display text-3xl uppercase text-hi"
                    >
                      {item.label}
                    </Link>
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
