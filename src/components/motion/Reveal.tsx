"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { transitions, viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Vertical offset to travel from, in px. */
  y?: number;
  /** Delay before the entrance plays, in seconds. */
  delay?: number;
}

/**
 * Scroll-reveal wrapper. Fades + lifts its children into view once, animating
 * only transform/opacity. Collapses to a plain fade when the user prefers
 * reduced motion. Children stay server-rendered — this only animates them.
 */
export function Reveal({ children, className, y = 18, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...transitions.entrance, delay: reduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
