"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

/** The classic. Enter the Konami code for a small, dignified reward. */
export function KonamiEasterEgg() {
  const [unlocked, setUnlocked] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let index = 0;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === SEQUENCE[index]) {
        index += 1;
        if (index === SEQUENCE.length) {
          setUnlocked(true);
          index = 0;
        }
      } else {
        index = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    const timer = setTimeout(() => setUnlocked(false), 6000);
    return () => clearTimeout(timer);
  }, [unlocked]);

  return (
    <AnimatePresence>
      {unlocked ? (
        <motion.div
          role="status"
          initial={{ opacity: 0, x: "-50%", y: reduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, x: "-50%", y: 0 }}
          exit={{ opacity: 0, x: "-50%", y: reduceMotion ? 0 : 24 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-1/2 z-[70] rounded-md border border-primary/50 bg-surface px-4 py-3 font-mono text-sm shadow-lg"
        >
          <span className="text-primary">achievement unlocked:</span> you speak Konami.{" "}
          <span className="text-muted">30 extra lives not included.</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
