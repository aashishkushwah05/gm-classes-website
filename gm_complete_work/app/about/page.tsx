import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarCheck, GraduationCap, HelpCircle, IndianRupee, Mail, MapPin, MessageCircle, NotebookText, Phone, Trophy, Users, TreePine } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { LifecycleImage } from "@/components/ui/lifecycle-image";
import { LearningJourney } from "@/components/about/learning-journey";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { faculty } from "@/lib/faculty";
import { courses } from "@/lib/courses";
import { siteConfig as s } from "@/config/site";

export const metadata: Metadata = {
  title: "About GM Classes — Guru Mantra Classes, Jetapur Khargone",
  description: "Learn about GM Classes (Guru Mantra Classes) in Jetapur, Khargone — our teaching philosophy, focused learning environment, faculty and academic programs.",
  alternates: { canonical: "/about" },
};

const eyebrow = "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary";
const h2 = "font-serif text-2xl font-semibold tracking-tight sm:text-3xl";
const btnPrimary =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-foreground shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-[#8a6425] hover:shadow-md active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
const btnSecondary =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 font-semibold transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/50 hover:bg-primary/[0.05] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
// CSS-only entrance for the hero: --gm-delay staggers the pieces; content is never held back by JavaScript.
const rise = (delay: number, y = 16, dur = 600) => ({ "--gm-delay": `${delay}s`, "--gm-rise-y": `${y}px`, "--gm-rise-dur": `${dur}ms` }) as React.CSSProperties;

// Every line below restates something already stated on this site's FAQ / Home / Admissions pages or in config/site.ts.
const approach = [
  { icon: GraduationCap, title: "Concepts from the basics", text: "We begin with the fundamentals, so students can learn advanced topics with greater confidence." },
  { icon: NotebookText, title: "Practice and revision", text: "Regular assignments, practice and revision are part of every course." },
  { icon: BookOpen, title: "Tests and progress tracking", text: "Regular subject-wise tests and performance assessment help track each student. Mock tests are available." },
  { icon: Users, title: "Doubt support and guidance", text: "Students can get their doubts resolved directly from the faculty, with individual attention and mentorship support." },
  { icon: Trophy, title: "Preparation for exams", text: "Board-specific preparation for MP Board and CBSE, along with Navodaya, PNST, ADDET, PVFT and JEE/NEET foundation courses." },
];
const reasons = [
  { icon: TreePine, title: "A calm place to study", text: "A peaceful area near Jitapur Nahar, away from the noise and crowd of the main city." },
  { icon: Users, title: "Subject-wise faculty", text: "Teachers for Maths, Science, Biology, Chemistry, Social Studies, Hindi and English." },
  { icon: NotebookText, title: "Study material", text: "Assignments, important questions and subject-wise notes." },
  { icon: GraduationCap, title: "Class 1 to 12", text: "Detailed course and fee information for Class 8 onward is on the Courses page." },
  { icon: IndianRupee, title: "Installments available", text: "Course fees can be paid in installments." },
  { icon: CalendarCheck, title: "7-day free demo", text: "Experience the classes before deciding on admission." },
];

export default function AboutPage() {
  const director = faculty.find((f) => f.isDirector);
  const jsonLd = { "@context":"https://schema.org", "@type":"EducationalOrganization", name:s.fullName, alternateName:s.name, foundingDate:String(s.establishedYear), description:s.about, email:s.email, telephone:s.phones[0], address:{"@type":"PostalAddress",streetAddress:"Nahar Marg, Sanawad Road, Jetapur",addressLocality:s.city,addressRegion:s.state,postalCode:s.pin,addressCountry:"IN"}, sameAs:[s.instagram].filter(Boolean) };
  const phone = (p: string) => p.replace(/\s/g, "");
  return (
    <main id="main-content" className="gm-inner-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* A — About hero */}
      <section aria-labelledby="about-title" className="gm-page-hero border-b border-border py-14 sm:py-20">
        <div className="container mx-auto grid items-center gap-10 px-5 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:px-8">
          <div>
            <p className={`${eyebrow} gm-rise`} style={rise(0, 12)}>About GM Classes</p>
            <h1 id="about-title" className="gm-rise font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl" style={rise(0.08, 20, 700)}>
              Building strong foundations for a brighter future.
            </h1>
            <p className="gm-rise mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg" style={rise(0.18)}>{s.about}</p>
            <div className="gm-rise mt-7 flex flex-col gap-3 sm:flex-row" style={rise(0.28)}>
              <Link href="/admissions" className={btnPrimary}>Explore admissions <ArrowRight className="size-4" aria-hidden="true" /></Link>
              <Link href="/courses" className={btnSecondary}>View courses</Link>
            </div>
            <ul className="gm-rise mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-5 text-sm text-muted" style={rise(0.36)}>
              <li><span className="font-semibold text-foreground">Class 1 to 12</span></li>
              <li>MP Board &amp; CBSE</li>
              <li>Hindi &amp; English medium</li>
            </ul>
          </div>
          <div className="gm-rise" style={rise(0.12, 24, 750)}>
            <figure>
              <div className="gm-about-image overflow-hidden rounded-3xl border border-border shadow-[0_30px_60px_-40px_rgba(26,23,20,.5)]">
                <LifecycleImage src="/institute-exterior.jpg" alt="GM Classes institute signboard and entrance in Jetapur, Khargone" width={1200} height={1500} sizes="(min-width:1024px) 45vw, 92vw" priority position="top" />
              </div>
              <figcaption className="mt-3 flex items-start gap-2 text-sm text-muted">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /> {s.address}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* B — Our approach (editorial list, not a wall of cards) */}
      <section aria-labelledby="approach-title" className="py-14 sm:py-16">
        <div className="container mx-auto grid gap-10 px-5 lg:grid-cols-[.8fr_1.2fr] lg:gap-16 lg:px-8">
          <ScrollReveal>
            <p className={eyebrow}>Our approach</p>
            <h2 id="approach-title" className={h2}>Build the foundation first.</h2>
            <p className="mt-4 border-l-2 border-primary/50 pl-4 font-serif text-lg italic leading-8 text-foreground">{s.philosophy}</p>
          </ScrollReveal>
          <ol className="divide-y divide-border border-y border-border">
            {approach.map(({ icon: Icon, title, text }, i) => (
              <ScrollReveal as="li" key={title} delay={Math.min(i * 0.06, 0.24)} className="gm-about-motion flex gap-4 py-5 sm:gap-5">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{text}</p>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* C — Why students choose us */}
      <section aria-labelledby="why-title" className="border-y border-border bg-surface py-14 sm:py-16">
        <div className="container mx-auto grid items-start gap-10 px-5 lg:grid-cols-[.85fr_1.15fr] lg:gap-14 lg:px-8">
          <ScrollReveal>
            <div className="gm-about-image overflow-hidden rounded-3xl border border-border bg-background">
              <LifecycleImage src="/classroom.jpg" alt="A GM Classes classroom with student benches and a blackboard" width={988} height={1100} sizes="(min-width:1024px) 40vw, 92vw" position="top" />
            </div>
          </ScrollReveal>
          <div>
            <ScrollReveal>
              <p className={eyebrow}>Why students choose us</p>
              <h2 id="why-title" className={h2}>A focused way to learn.</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{s.usp}</p>
            </ScrollReveal>
            <ul className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {reasons.map(({ icon: Icon, title, text }, i) => (
                <ScrollReveal as="li" key={title} delay={Math.min(i * 0.06, 0.24)} className="gm-about-motion flex gap-3 border-t border-border pt-4">
                  <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* D — Learning journey */}
      <section aria-labelledby="journey-title" className="py-14 sm:py-16">
        <div className="container mx-auto px-5 lg:px-8">
          <ScrollReveal>
            <p className={eyebrow}>Learning journey</p>
            <h2 id="journey-title" className={h2}>From understanding to exam-ready.</h2>
          </ScrollReveal>
          <div className="mt-10"><LearningJourney /></div>
        </div>
      </section>

      {/* Leadership (existing content, kept) */}
      <section aria-labelledby="leadership-title" className="border-y border-border bg-surface py-14 sm:py-16">
        <div className="container mx-auto grid items-center gap-8 px-5 lg:grid-cols-[.9fr_1.1fr] lg:gap-14 lg:px-8">
          {director && (
            <ScrollReveal>
              <div className="gm-about-image mx-auto max-w-lg overflow-hidden rounded-3xl border border-border bg-background p-4 sm:p-6">
                <LifecycleImage src={director.image} alt={`${director.name}, Director of GM Classes`} width={director.imageWidth} height={director.imageHeight} sizes="(min-width:1024px) 40vw, 92vw" fit="contain" className="rounded-2xl" />
              </div>
            </ScrollReveal>
          )}
          <ScrollReveal delay={0.1}>
            <p className={eyebrow}>Leadership</p>
            <h2 id="leadership-title" className={h2}>{director?.name}</h2>
            <p className="mt-2 text-sm font-semibold text-primary">{director?.designation}</p>
            <p className="mt-5 text-base leading-7 text-muted">
              The institute is led by its Director and Senior Faculty, with a focus on making core concepts clear and building student confidence through structured learning.
            </p>
            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              {director?.qualification && (<div className="gm-about-detail rounded-xl border border-border bg-background p-4"><dt className="text-xs text-muted">Qualification</dt><dd className="mt-1 font-semibold">{director.qualification}</dd></div>)}
              {director?.experience && (<div className="gm-about-detail rounded-xl border border-border bg-background p-4"><dt className="text-xs text-muted">Experience</dt><dd className="mt-1 font-semibold">{director.experience}</dd></div>)}
            </dl>
            <Link href="/faculty" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              Meet the full faculty <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* E — Institute identity (verified details only; no counters) */}
      <section aria-labelledby="identity-title" className="py-14 sm:py-16">
        <div className="container mx-auto px-5 lg:px-8">
          <ScrollReveal>
            <p className={eyebrow}>Institute details</p>
            <h2 id="identity-title" className={h2}>GM Classes at a glance.</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <div className="mt-8 grid gap-8 rounded-3xl border border-border p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
              <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {[
                  ["Institute", `${s.fullName} (${s.name})`],
                  ["Classes", "Class 1 to 12 · MP Board & CBSE · Hindi & English medium"],
                  ["Courses listed", `${courses.length} courses with fees on the Courses page`],
                  ["Teaching team", director ? `Led by ${director.name}, with subject-wise faculty` : "Subject-wise faculty"],
                  ["Location", s.address],
                  ["Hours", s.hours],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{k}</dt>
                    <dd className="mt-1 text-sm font-medium leading-6">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-col gap-3 lg:border-l lg:border-border lg:pl-8">
                <p className="text-sm text-muted">Talk to us or visit the institute.</p>
                <Link href="/admissions" className={btnPrimary}>Admission details <ArrowRight className="size-4" aria-hidden="true" /></Link>
                <a href={s.maps} target="_blank" rel="noopener noreferrer" className={btnSecondary}><MapPin className="size-4 text-primary" aria-hidden="true" /> Get directions</a>
                <div className="mt-1 space-y-1.5 text-sm">
                  {s.phones.map((p) => (<p key={p} className="flex items-center gap-2"><Phone className="size-4 text-primary" aria-hidden="true" /><a className="hover:underline" href={`tel:${phone(p)}`}>{p}</a></p>))}
                  <p className="flex items-center gap-2"><Mail className="size-4 text-primary" aria-hidden="true" /><a className="break-all hover:underline" href={`mailto:${s.email}`}>{s.email}</a></p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Student testimonials — genuine data only (see lib/testimonials.ts) */}
      <TestimonialsSection />

      {/* Explore + closing CTA (existing, kept) */}
      <section aria-labelledby="explore-title" className="border-y border-border bg-surface py-14 sm:py-16">
        <div className="container mx-auto px-5 lg:px-8">
          <ScrollReveal>
            <p className={eyebrow}>Explore GM Classes</p>
            <h2 id="explore-title" className={h2}>Go deeper into the institute.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">Explore the academic programs, meet the faculty, review verified results, or get answers to common questions before contacting the institute.</p>
          </ScrollReveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[[BookOpen, "Courses", "Explore current academic programs.", "/courses"], [Users, "Faculty", "Meet the teaching team.", "/faculty"], [Trophy, "Results", "View verified student achievements.", "/results"], [HelpCircle, "FAQs", "Find answers to common questions.", "/faq"]].map(([Icon, title, desc, href], i) => {
              const C = Icon as typeof BookOpen;
              return (
                <ScrollReveal as="li" key={title as string} delay={Math.min(i * 0.06, 0.24)}>
                  <Link href={href as string} className="group block h-full rounded-2xl border border-border bg-background p-5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <C className="size-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-4 font-semibold">{title as string}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{desc as string}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">Explore <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" /></span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="cta-title" className="py-14 sm:py-16">
        <div className="container mx-auto px-5 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-primary/30 bg-background p-7 sm:flex-row sm:items-center sm:p-9">
              <div>
                <p className={eyebrow}>Ready to explore?</p>
                <h2 id="cta-title" className={h2}>Find the right path for the student.</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted">Browse the current courses or talk directly to GM Classes about admission.</p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <Link href="/courses" className={btnPrimary}><BookOpen className="size-4" aria-hidden="true" /> Courses</Link>
                <Link href="/contact" className={btnSecondary}><MessageCircle className="size-4 text-primary" aria-hidden="true" /> Contact</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
