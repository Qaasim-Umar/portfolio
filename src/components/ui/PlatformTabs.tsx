"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectPlatform } from "@/lib/content";

export interface PlatformPanel {
  readonly key: ProjectPlatform;
  readonly label: string;
  readonly count: number;
  /** Server-rendered panel body; stays in the DOM (hidden) while inactive. */
  readonly content: ReactNode;
}

/**
 * Segmented mobile/web switcher. Every panel is rendered up front so the
 * content is in the HTML for crawlers and no-JS readers; only the active one
 * is visible. Arrow keys, Home, and End move between tabs.
 */
export function PlatformTabs({ panels, label }: { panels: readonly PlatformPanel[]; label: string }) {
  const [active, setActive] = useState(panels[0]?.key);
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = panels.length - 1;
    const keyMap: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const next = keyMap[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(panels[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="inline-flex rounded-lg border border-border bg-surface/60 p-1 font-mono text-sm"
      >
        {panels.map((panel, index) => {
          const selected = panel.key === active;
          return (
            <button
              key={panel.key}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${panel.key}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${panel.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(panel.key)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className="relative rounded-md px-4 py-1.5"
            >
              {selected ? (
                <motion.span
                  layoutId={`${baseId}-pill`}
                  className="absolute inset-0 rounded-md bg-primary"
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }}
                  aria-hidden
                />
              ) : null}
              <span
                className={`relative transition-colors duration-200 ${
                  selected ? "text-primary-foreground" : "text-muted hover:text-text"
                }`}
              >
                {panel.label}
                <span className="ml-2 opacity-70">{panel.count}</span>
              </span>
            </button>
          );
        })}
      </div>

      {panels.map((panel) => {
        const selected = panel.key === active;
        return (
          <motion.div
            key={panel.key}
            role="tabpanel"
            id={`${baseId}-panel-${panel.key}`}
            aria-labelledby={`${baseId}-tab-${panel.key}`}
            hidden={!selected}
            initial={false}
            animate={selected ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : 8 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
            className="mt-6"
          >
            {panel.content}
          </motion.div>
        );
      })}
    </div>
  );
}
