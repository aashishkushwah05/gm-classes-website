"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, RotateCcw } from "lucide-react";
import { classSelectionLabel, courseMatchesClass, courses, countCoursesFor, type ClassSelection } from "@/lib/courses";
import { siteConfig as s } from "@/config/site";
import { ClassSelector } from "./class-selector";
import { CourseCard } from "./course-card";

const ALL = "All";

function uniqueInOrder<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function Chips({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  if (options.length <= 1) return null; // only show filters where data actually varies
  return (
    <div role="group" aria-label={label} className="min-w-0">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
      <div className="flex flex-wrap gap-2">
        {[ALL, ...options].map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={`gm-class-tile min-h-10 rounded-full border px-3.5 text-xs font-semibold transition-colors ${
                active
                  ? "border-foreground bg-foreground text-[#f3dfb0]"
                  : "border-border bg-background text-muted hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function enquiryLink(text: string) {
  return `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function CoursesExplorer() {
  const reduce = useReducedMotion();
  const [selection, setSelection] = useState<ClassSelection>("all");
  const [boardFilter, setBoardFilter] = useState(ALL);
  const [mediumFilter, setMediumFilter] = useState(ALL);
  const [categoryFilter, setCategoryFilter] = useState(ALL);

  const boardOptions = useMemo(() => uniqueInOrder(courses.map((c) => c.board).filter((b) => b !== "—")), []);
  const mediumOptions = useMemo(() => uniqueInOrder(courses.map((c) => c.medium).filter((m) => m !== "—")), []);
  const categoryOptions = useMemo(() => uniqueInOrder(courses.map((c) => c.category)), []);

  const filtered = courses.filter(
    (c) =>
      courseMatchesClass(c, selection) &&
      (boardFilter === ALL || c.board === boardFilter) &&
      (mediumFilter === ALL || c.medium === mediumFilter) &&
      (categoryFilter === ALL || c.category === categoryFilter)
  );

  const refineActive = [boardFilter, mediumFilter, categoryFilter].some((f) => f !== ALL);
  const anyActive = selection !== "all" || refineActive;
  const classHasNoRecords = typeof selection === "number" && countCoursesFor(selection) === 0;

  const clearRefine = () => {
    setBoardFilter(ALL);
    setMediumFilter(ALL);
    setCategoryFilter(ALL);
  };
  const resetAll = () => {
    setSelection("all");
    clearRefine();
  };

  const resultKey = `${selection}|${boardFilter}|${mediumFilter}|${categoryFilter}`;
  const groupedResults = useMemo(() => {
    const groups = new Map<string, typeof filtered>();
    for (const course of filtered) {
      const group = course.category === "Regular" && course.classSort >= 8 && course.classSort <= 12
        ? course.classLabel
        : course.category === "Regular" ? course.classLabel : "Entrance & Special Courses";
      groups.set(group, [...(groups.get(group) ?? []), course]);
    }
    const order = ["Classes 1–4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "Entrance & Special Courses"];
    return [...groups.entries()].sort(([a], [b]) => {
      const ai = order.indexOf(a); const bi = order.indexOf(b);
      return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi);
    });
  }, [filtered]);

  return (
    <div>
      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <ClassSelector value={selection} onChange={setSelection} />

        <div className="mt-6 border-t border-border pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold tracking-tight">Refine</h2>
            {refineActive && (
              <button
                type="button"
                onClick={clearRefine}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-[#7a5720] hover:underline"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" /> Clear refinements
              </button>
            )}
          </div>
          <div className="mt-3 grid gap-5 md:grid-cols-[1.4fr_1fr_1fr]">
            <Chips label="Course type" options={categoryOptions} value={categoryFilter} onChange={setCategoryFilter} />
            <Chips label="Board" options={boardOptions} value={boardFilter} onChange={setBoardFilter} />
            <Chips label="Medium" options={mediumOptions} value={mediumFilter} onChange={setMediumFilter} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" role="status" aria-live="polite">
          <span className="font-semibold text-foreground">{classSelectionLabel(selection)}</span>
          {" · "}
          {filtered.length} course{filtered.length === 1 ? "" : "s"} found
        </p>
        {anyActive && (
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-semibold hover:border-primary/50"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" /> Show all courses
          </button>
        )}
      </div>

      {filtered.length > 0 && (
        <div key={resultKey} className="mt-5 space-y-10 sm:space-y-12">
          {groupedResults.map(([group, groupCourses], groupIndex) => (
            <section key={group} aria-labelledby={`course-group-${groupIndex}`} className="min-w-0">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Explore programmes</p>
                  <h2 id={`course-group-${groupIndex}`} className="mt-1 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">{group}</h2>
                </div>
                <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted">{groupCourses.length} {groupCourses.length === 1 ? "course" : "courses"}</span>
              </div>
              <div className="mb-5 overflow-hidden rounded-xl border border-primary/15 bg-[linear-gradient(90deg,rgba(156,114,44,.08),rgba(255,255,255,.55),rgba(156,114,44,.08))] py-2.5">
                <div className="gm-course-section-marquee flex w-max items-center gap-4 whitespace-nowrap text-xs font-semibold text-[#765720] motion-reduce:animate-none">
                  {[0, 1].map((copy) => <span key={copy} className="flex items-center gap-4 pr-4">{groupCourses.map((course) => <span key={course.id} className="inline-flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary" />{course.name} <span className="font-bold">{course.fee > 0 ? `₹${course.fee.toLocaleString("en-IN")}${course.feeUnit === "/ year" ? "/year" : ""}` : "Contact for fee"}</span><span className="text-primary/40">✦</span></span>)}</span>)}
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {groupCourses.map((course, i) => (
                  <motion.div key={course.id} initial={reduce ? false : { opacity: 0, y: 34, scale: 0.975 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduce ? 0 : 0.58, delay: reduce ? 0 : Math.min(i * 0.07, 0.28), ease: [0.22, 1, 0.36, 1] }} className="gm-course-card-reveal min-w-0">
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-surface p-8 text-center sm:p-10">
          {classHasNoRecords ? (
            <>
              <p className="text-base font-semibold">GM Classes coaches {classSelectionLabel(selection)}.</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
                Course details for this class are not listed online yet. Please enquire for batch, timing and fee details.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a
                  href={enquiryLink(`Hello GM Classes, I want to know about coaching for ${classSelectionLabel(selection)}.`)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground"
                >
                  <MessageCircle className="size-4" aria-hidden="true" /> Enquire on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={resetAll}
                  className="inline-flex min-h-11 items-center rounded-xl border border-border bg-background px-5 text-sm font-semibold hover:border-primary/50"
                >
                  Show all courses
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-base font-semibold">No courses match these selections.</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
                Try clearing a refinement, or go back to all courses.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                {refineActive && (
                  <button
                    type="button"
                    onClick={clearRefine}
                    className="inline-flex min-h-11 items-center rounded-xl border border-border bg-background px-5 text-sm font-semibold hover:border-primary/50"
                  >
                    Clear refinements
                  </button>
                )}
                <button
                  type="button"
                  onClick={resetAll}
                  className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground"
                >
                  Show all courses
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
