import type { Metadata } from "next";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ResultCard } from "@/components/results/result-card";
import { academicResults, getAcademicGroups, selectionResults } from "@/lib/results";
import { siteConfig as s } from "@/config/site";

export const metadata: Metadata = {
  title: "Results & Achievers — GM Classes, Jetapur Khargone",
  description:
    "Verified student results and selections from GM Classes — board exam scores for Class 9, 10 and 12, plus Navodaya and ADDET selections.",
  alternates: { canonical: "/results" },
};

const eyebrow = "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary";
const h2 = "font-serif text-2xl font-semibold tracking-tight sm:text-3xl";
const grid = "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3";

// Sections are generated from the data in lib/results.ts — nothing is hardcoded per class.
const sections = [
  ...getAcademicGroups().map((g) => ({ id: g.id, title: g.title, items: g.items })),
  { id: "entrance-selections", title: "Entrance Exam Selections", items: selectionResults },
];

export default function ResultsPage() {
  return (
    <main id="main-content" className="gm-inner-page">
      <section className="gm-page-hero border-b border-border py-16 sm:py-20">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <p className={eyebrow}>Results</p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Our Results, Our Pride</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              Board-exam results and entrance-exam selections from GM Classes students, shown exactly as
              reported. Where a result was achieved subject by subject, we show the subject marks.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <nav aria-label="Jump to a results section" className="mt-7">
              <ul className="flex flex-wrap gap-2">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold transition-colors hover:border-primary/50 hover:bg-primary/[0.05]"
                    >
                      {sec.title}
                      <span className="text-xs font-medium text-muted">{sec.items.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </section>

      <section aria-label="Student results ticker" className="gm-results-ticker-viewport relative overflow-hidden border-y border-border bg-[#0a0907] text-[#f3ead8]">
        <div className="flex min-h-12 items-center">
          <span className="relative z-10 flex min-h-12 shrink-0 items-center bg-primary px-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary-foreground shadow-[8px_0_18px_rgba(0,0,0,.25)] sm:px-5 sm:text-xs">Results Highlights</span>
          <div className="gm-results-ticker-track flex w-max items-center">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                {[
                  ...academicResults.map((r) => ({ id: r.id, text: `${r.name} · ${r.classLabel} · ${r.kind === "percentage" ? `${r.percentage}%` : r.marks.map((m) => `${m.subject} ${m.score}`).join(" / ")}` })),
                  ...selectionResults.map((r) => ({ id: r.id, text: `${r.name} · ${r.exam} · ${r.achievement}` })),
                ].map((item) => (
                  <span key={`${copy}-${item.id}`} className="flex shrink-0 items-center gap-3 px-5 py-3 text-xs font-medium tracking-wide sm:px-7 sm:text-sm">
                    <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>{item.text}</span>
                    <span className="ml-2 h-px w-7 bg-primary/50" aria-hidden="true" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {sections.map((sec, i) => (
        <section
          key={sec.id}
          id={sec.id}
          aria-labelledby={`${sec.id}-title`}
          className={`scroll-mt-24 py-14 sm:py-16 ${i % 2 === 0 ? "border-y border-border bg-surface" : ""}`}
        >
          <div className="container mx-auto px-5 lg:px-8">
            <Reveal>
              <h2 id={`${sec.id}-title`} className={h2}>{sec.title}</h2>
            </Reveal>
            <div className={grid}>
              {sec.items.map((r, idx) => (
                <Reveal key={r.id} delay={Math.min((idx % 3) * 0.08, 0.16)} className="gm-card-reveal gm-result-card-reveal">
                  <ResultCard record={r} index={idx} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-border bg-surface py-16 sm:py-20">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-primary/30 bg-background p-7 sm:flex-row sm:items-center sm:p-9">
              <div>
                <p className={eyebrow}>Want results like these?</p>
                <h2 className={h2}>Book a free demo class.</h2>
              </div>
              <a
                href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent("Hello GM Classes, I'd like to know more after seeing your results.")}`}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-foreground shadow-[0_10px_30px_-14px_rgba(156,114,44,.9)] hover:-translate-y-0.5"
              >
                <MessageCircle className="size-4" /> Enquire on WhatsApp <ArrowRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
