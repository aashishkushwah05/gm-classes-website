"use client";

import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { classBands, countCoursesFor, courses, type ClassSelection } from "@/lib/courses";

function countLabel(n: number) {
  return n === 0 ? "Enquire" : `${n} course${n === 1 ? "" : "s"}`;
}

function Tile({
  active,
  onClick,
  children,
  label,
  className = "",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`gm-class-tile relative isolate min-h-14 min-w-0 rounded-xl border text-center transition-colors duration-200 ${
        active
          ? "border-foreground text-[#f3dfb0]"
          : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/[0.05]"
      } ${className}`}
    >
      {active && (
        <motion.span
          layoutId="gm-class-active"
          className="absolute inset-0 -z-10 rounded-[11px] bg-foreground"
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 38 }}
        />
      )}
      {children}
    </button>
  );
}

export function ClassSelector({
  value,
  onChange,
}: {
  value: ClassSelection;
  onChange: (v: ClassSelection) => void;
}) {
  const competitiveCount = countCoursesFor("competitive");

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Choose your class</h2>
          <p className="mt-0.5 text-sm text-muted">GM Classes coaches Class 1 to 12. Tap a class to see its courses.</p>
        </div>
        <button
          type="button"
          onClick={() => onChange("all")}
          aria-pressed={value === "all"}
          className={`gm-class-tile inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors ${
            value === "all"
              ? "border-foreground bg-foreground text-[#f3dfb0]"
              : "border-border bg-background hover:border-primary/50 hover:bg-primary/[0.05]"
          }`}
        >
          All courses
          <span className={`text-xs font-medium ${value === "all" ? "text-[#f3dfb0]/80" : "text-muted"}`}>{courses.length}</span>
        </button>
      </div>

      <LayoutGroup id="class-selector">
        <div className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-[5fr_3fr_2fr_2fr]">
          {classBands.map((band) => (
            <div key={band.id} role="group" aria-label={`${band.label}, ${band.stage}`} className="min-w-0">
              <p className="mb-2 flex flex-wrap items-baseline gap-x-2 text-xs">
                <span className="font-semibold text-foreground">{band.label}</span>
                <span className="text-muted">{band.stage}</span>
              </p>
              <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${band.classes.length}, minmax(0, 1fr))` }}>
                {band.classes.map((n) => {
                  const count = countCoursesFor(n);
                  const active = value === n;
                  return (
                    <Tile
                      key={n}
                      active={active}
                      onClick={() => onChange(n)}
                      label={`Class ${n}, ${count === 0 ? "enquire for details" : `${count} course${count === 1 ? "" : "s"}`}`}
                      className="px-0.5 py-2"
                    >
                      <span className="block text-lg font-semibold leading-none">{n}</span>
                      <span className={`mt-1 block text-[10px] leading-3 ${active ? "text-[#f3dfb0]/80" : "text-muted"}`}>
                        {countLabel(count)}
                      </span>
                    </Tile>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Tile
            active={value === "competitive"}
            onClick={() => onChange("competitive")}
            label={`Competitive and Foundation courses, ${competitiveCount} courses`}
            className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-0.5 px-4 py-2.5 text-left"
          >
            <span className="text-sm font-semibold">Competitive &amp; Foundation</span>
            <span className={`text-xs ${value === "competitive" ? "text-[#f3dfb0]/80" : "text-muted"}`}>
              PNST / ADDET / PVFT, JEE / NEET · {countLabel(competitiveCount)}
            </span>
          </Tile>
        </div>
      </LayoutGroup>
    </div>
  );
}
