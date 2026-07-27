"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Fade/slide a block into view on scroll. Honors reduced-motion by
 * rendering static. Use `delay` and `stagger` to choreograph groups.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  once = true,
  amount = 0.3,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const { x, y } = offset[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : x, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers direct <Reveal.Item> children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  once = true,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  amount?: number;
}) {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  direction = "up",
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { x, y } = offset[direction];
  const variants: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : x, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
