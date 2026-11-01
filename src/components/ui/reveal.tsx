"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  as?: "div" | "section";
}

export function Reveal({ children, className, delay = 0, amount = 0.18, as = "div" }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const initial: MotionProps["initial"] = prefersReducedMotion ? false : { opacity: 0, y: 22 };
  const visible: MotionProps["whileInView"] = { opacity: 1, y: 0 };
  const transition: MotionProps["transition"] = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] };
  const common = {
    initial,
    whileInView: visible,
    viewport: { once: true, amount },
    transition,
    className,
  };

  return as === "section" ? <motion.section {...common}>{children}</motion.section> : <motion.div {...common}>{children}</motion.div>;
}
