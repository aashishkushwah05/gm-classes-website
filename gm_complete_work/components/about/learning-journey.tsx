"use client";

import { BookOpenCheck, ClipboardCheck, Lightbulb, PenLine } from "lucide-react";
import { REVEAL_EASE, ScrollReveal, useScrollReveal } from "@/components/ui/scroll-reveal";

// Each step restates something the institute already says on its FAQ / Home pages.
const steps = [
  { icon: Lightbulb, title: "Understand the concepts", text: "Learning starts with the basics of each topic, so the fundamentals are clear." },
  { icon: PenLine, title: "Practise regularly", text: "Assignments, important questions and revision are part of every course." },
  { icon: ClipboardCheck, title: "Review progress", text: "Regular subject-wise tests and mock tests help track how a student is doing." },
  { icon: BookOpenCheck, title: "Prepare for the exam", text: "Board-specific preparation, and competitive-exam preparation where the course includes it." },
];

/** Horizontal on large screens, vertical timeline on small ones. The connecting line draws once, on scroll. */
export function LearningJourney() {
  const { ref, phase } = useScrollReveal<HTMLOListElement>();
  const undrawn = phase === "armed";
  const line = (axis: "x" | "y") => ({
    transform: undrawn ? (axis === "x" ? "scaleX(0)" : "scaleY(0)") : "none",
    transformOrigin: axis === "x" ? "left center" : "center top",
    transition: phase === "shown" ? `transform 1000ms ${REVEAL_EASE} 150ms` : undefined,
  });

  return (
    <div>
      <ol ref={ref} className="relative grid gap-9 lg:grid-cols-4 lg:gap-6">
        {/* connecting line — vertical (mobile) and horizontal (desktop) */}
        <span aria-hidden="true" className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-border lg:hidden">
          <span className="block h-full w-full bg-primary/60" style={line("y")} />
        </span>
        <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[1.4rem] hidden h-px bg-border lg:block">
          <span className="block h-full w-full bg-primary/60" style={line("x")} />
        </span>

        {steps.map(({ icon: Icon, title, text }, i) => (
          <ScrollReveal as="li" key={title} delay={Math.min(i * 0.1, 0.3)} className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-5 lg:text-center">
            <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border border-primary/40 bg-background text-primary">
              <Icon className="size-5" aria-hidden="true" />
              <span className="sr-only">Step {i + 1}: </span>
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Step {i + 1}</p>
              <h3 className="mt-1 text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{text}</p>
            </div>
          </ScrollReveal>
        ))}
      </ol>
      <p className="mt-8 text-sm text-muted">
        This is a suggested learning flow, not a fixed programme. The exact path depends on the student&rsquo;s class, course and needs.
      </p>
    </div>
  );
}
