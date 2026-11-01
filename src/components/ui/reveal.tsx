"use client";

import { useEffect, useRef, type ReactNode, type Ref } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Fraction of the element that must be visible before it animates in. */
  amount?: number;
  as?: "div" | "section";
}

/**
 * Lightweight scroll reveal.
 *
 * Deliberately hand-rolled instead of pulling in an animation library: the
 * wedding invitation is opened from WhatsApp on mid-range phones, so the page
 * ships ~40kB less JavaScript and only animates opacity/transform on the
 * compositor. Content is visible without JavaScript, and motion is skipped
 * entirely when the visitor prefers reduced motion.
 */
export function Reveal({ children, className, delay = 0, amount = 0.15, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") return;

    // Only hide elements that begin below the fold, so above-the-fold content
    // never flashes and no-JS visitors always see the invitation.
    if (node.getBoundingClientRect().top <= window.innerHeight * 0.92) return;

    node.classList.add("is-armed");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add("is-visible");
            observer.disconnect();
          }
        }
      },
      { threshold: Math.min(Math.max(amount, 0.05), 0.35), rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      node.classList.remove("is-armed");
    };
  }, [amount]);

  const classes = ["reveal", className ?? ""].filter(Boolean).join(" ");
  const style = delay > 0 ? { transitionDelay: `${Math.round(delay * 1000)}ms` } : undefined;

  if (as === "section") {
    return (
      <section ref={ref as unknown as Ref<HTMLElement>} className={classes} style={style}>
        {children}
      </section>
    );
  }

  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  );
}
