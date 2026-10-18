"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Brief branded entrance on initial page load; honors reduced-motion preferences. */
export function BrandIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 1250);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;
  return (
    <div className="gm-brand-intro" role="status" aria-label="Loading GM Classes">
      <div className="gm-brand-intro-mark">
        <Image src="/gm-logo.png" alt="GM Classes — Guru Mantra Coaching Institute" width={64} height={64} priority className="h-12 w-12 object-contain" />
      </div>
    </div>
  );
}
