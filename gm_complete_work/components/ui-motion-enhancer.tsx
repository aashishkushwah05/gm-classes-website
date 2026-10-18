"use client";

import { useEffect } from "react";

/** Adds lightweight, accessible scroll-reveal motion without changing page content or layout. */
export function UiMotionEnhancer() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const targets = document.querySelectorAll<HTMLElement>(
      "main section, main article, main [data-motion='card']"
    );
    if (!targets.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("gm-motion-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -36px 0px" }
    );

    targets.forEach((target, index) => {
      target.classList.add("gm-motion-target");
      target.style.setProperty("--gm-motion-delay", `${Math.min(index % 4, 3) * 65}ms`);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
