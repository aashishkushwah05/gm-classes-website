"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/** Scroll-triggered entrance: cards/content rise into place when they enter the viewport. */
export function Reveal({ children, delay = 0, className, as = "div" }: { children: React.ReactNode; delay?: number; className?: string; as?: "div" | "li" }) {
  const reduce = useReducedMotion();
  const revealRef = useRef<HTMLElement | null>(null);
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      ref={(node: HTMLDivElement | HTMLLIElement | null) => { revealRef.current = node; }}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 54, scale: 0.965, rotateX: 4 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -45px 0px" }}
      onViewportEnter={() => {
        const element = revealRef.current;
        if (element && className?.includes("gm-card-reveal")) element.dataset.visible = "true";
      }}
      transition={{ duration: reduce ? 0 : 0.72, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1000, transformOrigin: "center bottom" }}
    >
      {children}
    </Tag>
  );
}
