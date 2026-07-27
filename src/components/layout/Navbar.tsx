"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? "border-b border-white/10 bg-void/60 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-(--spacing-gutter)">
          {/* Wordmark */}
          <Link
            href="/"
            aria-label="BLXCK Marketing home"
            className="font-heading text-[1.05rem] tracking-[0.28em] text-hi transition-opacity hover:opacity-80"
          >
            BLXCK
          </Link>

          {/* Desktop links — centered */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
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

          {/* Right CTA */}
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
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-void/95 px-(--spacing-gutter) backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.06 + i * 0.05,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    className="block py-3 font-display text-4xl uppercase text-hi"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-12 flex flex-col gap-2 text-sm text-lo">
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
