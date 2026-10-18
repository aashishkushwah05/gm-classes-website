"use client";

import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fail-safe scroll reveal.
 *  - Server HTML and first paint are fully VISIBLE (phase "visible"), so nothing is hidden if JS or
 *    IntersectionObserver is unavailable or fails.
 *  - After mount, only elements that are still below the fold are "armed" (hidden); everything already
 *    on screen is left alone, so there is no hide-then-show flash.
 *  - An armed element animates in once, when it scrolls into view. It never replays.
 *  - Reduced motion: never armed — content simply stays visible, no movement.
 */
type Phase = "visible" | "armed" | "shown";
export const REVEAL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95 && r.bottom > 0) return; // already on screen: leave visible
    setPhase("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, phase };
}

export function ScrollReveal({
  children,
  delay = 0,
  y = 18,
  as = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section";
  className?: string;
}) {
  const { ref, phase } = useScrollReveal<HTMLElement>();
  const armed = phase === "armed";
  return createElement(
    as,
    {
      ref,
      className,
      "data-reveal": phase,
      style: {
        opacity: armed ? 0 : 1,
        transform: armed ? `translateY(${y}px)` : "none",
        transition: phase === "shown" ? `opacity 600ms ${REVEAL_EASE} ${delay}s, transform 600ms ${REVEAL_EASE} ${delay}s` : undefined,
      },
    },
    children,
  );
}
