"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { Testimonial } from "@/lib/testimonials";
import { TestimonialCard } from "./testimonial-card";

const ALL = "All";

/** Responsive grid (1 / 2 / 3 columns). All content is visible without any carousel interaction. */
export function TestimonialGrid({ items, filters }: { items: Testimonial[]; filters: string[] }) {
  const [active, setActive] = useState(ALL);
  const shown = active === ALL ? items : items.filter((t) => t.classLabel === active);

  return (
    <div>
      {filters.length > 0 && (
        <div role="group" aria-label="Filter testimonials by class" className="mb-6 flex flex-wrap gap-2">
          {[ALL, ...filters].map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={active === f}
              onClick={() => setActive(f)}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                active === f ? "border-foreground bg-foreground text-[#f3dfb0]" : "border-border bg-background text-muted hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {shown.map((t, i) => (
          <ScrollReveal as="li" key={t.id} delay={Math.min(i * 0.06, 0.24)} className="min-w-0">
            <TestimonialCard t={t} />
          </ScrollReveal>
        ))}
      </ul>
    </div>
  );
}
