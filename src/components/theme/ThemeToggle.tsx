"use client";

import { useEffect } from "react";
import { Icon } from "@/components/icons/Icon";

/**
 * Two-state theme toggle (system default ⇄ pinned opposite).
 *
 * - The icon is driven purely by the `.dark` class via CSS, so it is correct on
 *   first paint with zero hydration mismatch and no React state.
 * - Clicking flips the class and persists the explicit choice.
 * - Until a choice is pinned, the site keeps following live OS theme changes.
 */
export function ThemeToggle() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return; // user pinned a choice — leave it
      document.documentElement.classList.toggle("dark", event.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* storage may be unavailable (private mode) — toggle still works for the session */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      title="Toggle theme — the dark one is the canonical build"
      className="grid h-9 w-9 cursor-pointer place-items-center rounded-md border border-border text-muted transition-colors duration-200 hover:border-primary hover:text-primary"
    >
      <Icon name="sun" className="hidden h-[18px] w-[18px] dark:block" />
      <Icon name="moon" className="block h-[18px] w-[18px] dark:hidden" />
    </button>
  );
}
