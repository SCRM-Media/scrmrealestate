"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed top-[var(--topbar-h)] inset-x-0 z-40 bg-white/95 backdrop-blur-sm border-b border-re-stone-light"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-[var(--header-h)] flex items-center justify-between gap-6">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7 text-sm" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative tracking-tight transition-colors ${
                  active ? "text-re-blue" : "text-re-ink hover:text-re-blue"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-px bg-re-blue" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-re-blue text-white text-sm px-5 py-2.5 hover:bg-re-blue-accent transition-colors"
          >
            Book a Call
            <span aria-hidden>→</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex items-center justify-center h-11 w-11 -mr-2 text-re-ink"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-re-ink/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-[88%] max-w-sm bg-re-ivory shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between px-5 h-16 border-b border-re-stone-light">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center h-11 w-11 -mr-2"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col px-5 py-6 gap-1" aria-label="Primary mobile">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between py-4 text-2xl font-serif border-b border-re-stone-light/60 ${
                    active ? "text-re-blue" : "text-re-ink"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-re-stone text-base">→</span>
                </Link>
              );
            })}
          </nav>

          <div className="px-5 mt-2 space-y-3 text-sm">
            <Link
              href="/contact"
              className="flex items-center justify-center w-full bg-re-blue text-white py-3.5 hover:bg-re-blue-accent transition-colors"
            >
              Book a Call
            </Link>
            <a href={`tel:${SITE.phoneIntl}`} className="block text-re-ink">
              <span className="label-eyebrow block mb-1">Call</span>
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="block text-re-ink">
              <span className="label-eyebrow block mb-1">Email</span>
              {SITE.email}
            </a>
          </div>
        </aside>
      </div>
    </header>
  );
}
