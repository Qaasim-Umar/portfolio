import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language. Entrances use an expo-out curve so things decelerate
 * into place; interactions use a snappy spring. Components are responsible for
 * degrading these via `useReducedMotion()`.
 */

/** Expo-out easing — fast start, gentle settle. */
export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transitions = {
  entrance: { duration: 0.55, ease: easeOut },
  fast: { duration: 0.3, ease: easeOut },
  spring: { type: "spring", stiffness: 320, damping: 26 },
} satisfies Record<string, Transition>;

/** Default viewport config for scroll-triggered reveals. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transitions.entrance },
};

/** Opacity-only variant used when the user prefers reduced motion. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export function staggerContainer(stagger = 0.07, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}
