"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeOnly, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const containers = { div: motion.div, ul: motion.ul, ol: motion.ol } as const;
const items = { div: motion.div, li: motion.li, span: motion.span } as const;

type ContainerTag = keyof typeof containers;
type ItemTag = keyof typeof items;

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: ContainerTag;
  /** Seconds between each child's entrance. */
  stagger?: number;
  /** Delay before the first child plays. */
  delay?: number;
}

/**
 * Orchestrates a staggered entrance for its `<StaggerItem>` children when the
 * group scrolls into view. Each item must be a `<StaggerItem>` for the stagger
 * to propagate.
 */
export function Stagger({
  children,
  className,
  as = "div",
  stagger = 0.07,
  delay = 0,
}: StaggerProps) {
  const Tag = containers[as];
  return (
    <Tag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Tag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: ItemTag;
}

export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const Tag = items[as];
  return (
    <Tag className={className} variants={reduceMotion ? fadeOnly : fadeUp}>
      {children}
    </Tag>
  );
}
