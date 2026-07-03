"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navItems, profile } from "@/lib/content";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Nav() {
  const [activeId, setActiveId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  // Mailto links silently no-op when the browser has no mail client configured,
  // so back them with a clipboard copy that always gives visible feedback.
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleSayHi = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Clipboard blocked (permissions/insecure context) — mailto still fires.
    }
  };

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/75 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="group flex items-center gap-1.5 font-mono text-sm font-semibold tracking-tight"
        >
          <span className="text-primary">{">"}</span>
          <span className="text-text">qaasim</span>
          <span className="ml-0.5 inline-block h-4 w-2 bg-primary motion-safe:animate-pulse" aria-hidden />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active ? "true" : undefined}
                  className={`rounded-md px-3 py-2 font-mono text-[13px] transition-colors duration-200 hover:text-primary ${
                    active ? "text-primary" : "text-muted"
                  }`}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            onClick={handleSayHi}
            className="hidden rounded-md border border-border px-3 py-2 font-mono text-[13px] text-text transition-colors duration-200 hover:border-primary hover:text-primary sm:inline-flex"
          >
            Say hi
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-md border border-border text-muted transition-colors hover:border-primary hover:text-primary md:hidden"
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-current transition-all duration-200 ${
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-current transition-all duration-200 ${
                  menuOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border/60 bg-bg/95 backdrop-blur-md md:hidden"
          >
            <ul className="mx-auto flex w-full max-w-5xl flex-col px-5 py-3 sm:px-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-md px-2 py-3 font-mono text-sm text-muted transition-colors hover:text-primary"
                  >
                    <span className="text-xs text-primary/70">{item.index}</span>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {copied ? (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="pointer-events-none absolute inset-x-0 top-full flex justify-center px-5 pt-3 sm:justify-end sm:px-8"
          >
            <div className="rounded-md border border-primary/50 bg-surface px-3 py-2 font-mono text-xs text-text shadow-lg">
              <span className="text-primary">copied:</span> {profile.email} — your mail app should be opening too.
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
