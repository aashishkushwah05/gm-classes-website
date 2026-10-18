import type { Metadata } from "next";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { CoursesExplorer } from "@/components/courses/courses-explorer";
import { AdmissionHighlights } from "@/components/courses/admission-highlights";
import { siteConfig as s } from "@/config/site";

export const metadata: Metadata = {
  title: "Courses — GM Classes, Jetapur Khargone",
  description:
    "Coaching for Class 1 to 12 at GM Classes, Jetapur Khargone. Browse courses and fees for Class 8 to 12 (MP Board & CBSE, Hindi + English medium), Navodaya entrance, PNST/ADDET/PVFT, JEE/NEET foundation and crash courses — or enquire for other classes.",
  alternates: { canonical: "/courses" },
};

const eyebrow = "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary";
const h2 = "font-serif text-3xl font-semibold tracking-tight sm:text-4xl";

export default function CoursesPage() {
  return (
    <main id="main-content" className="gm-inner-page">
      <section className="gm-page-hero border-b border-border py-14 sm:py-18">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <p className={eyebrow}>Courses · Class 1 to 12</p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl" style={{ maxWidth: "24ch" }}>
              Coaching for Class 1 to 12, all in one place.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              From foundational classes to senior secondary and entrance-exam preparation. Choose a class to see
              its courses, fees and batch timings, then open any course for full details.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7">
              <AdmissionHighlights />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="container mx-auto px-5 lg:px-8">
          <CoursesExplorer />
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16 sm:py-20" id="contact">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-primary/30 bg-background p-7 sm:flex-row sm:items-center sm:p-9">
              <div>
                <p className={eyebrow}>Still deciding?</p>
                <h2 className={h2}>Talk to us about the right course.</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  <li className="flex items-center gap-2"><Phone className="size-4 text-primary" /> {s.phones[0]}</li>
                  <li className="flex items-center gap-2"><Clock className="size-4 text-primary" /> {s.hours}</li>
                  <li className="flex items-center gap-2"><MapPin className="size-4 text-primary" /> {s.address}</li>
                </ul>
              </div>
              <a
                href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent("Hello GM Classes, I want to know more about a course.")}`}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-foreground shadow-[0_10px_30px_-14px_rgba(156,114,44,.9)] hover:-translate-y-0.5"
              >
                Enquire on WhatsApp <ArrowRight className="size-4" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <a href={s.maps} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3">
              Get directions to GM Classes <ArrowRight className="size-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
