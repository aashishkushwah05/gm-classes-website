import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { courses, getCourse, formatFee, sharedHighlights, admissionNote } from "@/lib/courses";
import { siteConfig as s } from "@/config/site";

const h2 = "font-serif text-2xl font-semibold tracking-tight sm:text-3xl";

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) return {};
  return {
    title: `${course.name} — GM Classes`,
    description: `${course.description} Fee: ${formatFee(course)}.`,
    alternates: { canonical: `/courses/${course.id}` },
  };
}

const admissionSteps = [
  ["01", "Visit the institute", "Meet the team at GM Classes to discuss your requirement."],
  ["02", "Counselling", "Get guidance on the right class, board, medium and batch."],
  ["03", "Select course & batch", "Confirm subjects, timing and fee structure."],
  ["04", "Registration", "Complete the admission formalities at the centre."],
] as const;

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "EducationalOrganization",
      name: s.fullName,
      sameAs: s.instagram,
    },
    offers: {
      "@type": "Offer",
      price: course.fee,
      priceCurrency: "INR",
      category: course.feeUnit === "/ year" ? "Annual" : undefined,
    },
  };

  return (
    <main id="main-content" className="gm-inner-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="gm-page-hero border-b border-border py-14 sm:py-18">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary">
              <ArrowLeft className="size-4" /> All courses
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {course.category}
              </span>
              {course.board !== "—" && <span className="text-xs font-medium text-muted">{course.board}</span>}
              {course.medium !== "—" && <span className="text-xs font-medium text-muted">· {course.medium} Medium</span>}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">{course.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{course.description}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div className="rounded-2xl border border-border bg-surface px-5 py-3">
                <p className="text-xs text-muted">Course Fee</p>
                <p className="text-2xl font-semibold">{formatFee(course)}</p>
              </div>
              {course.batchTiming && (
                <div className="rounded-2xl border border-border bg-surface px-5 py-3">
                  <p className="text-xs text-muted">Batch timing</p>
                  <p className="flex items-center gap-1.5 text-base font-medium"><Clock className="size-4 text-primary" /> {course.batchTiming}</p>
                </div>
              )}
              <a
                href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent(`Hello GM Classes, I want to enquire about ${course.name}.`)}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-foreground shadow-[0_10px_30px_-14px_rgba(156,114,44,.9)] hover:-translate-y-0.5"
              >
                <MessageCircle className="size-4" /> Enquire Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {course.thumbnail && (
        <section className="py-10">
          <div className="container mx-auto px-5 lg:px-8">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-border">
                <Image src={course.thumbnail} alt={`${course.name} fee and batch details`} width={1672} height={941} className="h-auto w-full" sizes="(min-width:1024px) 900px, 100vw" />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16">
        <div className="container mx-auto grid gap-10 px-5 lg:grid-cols-[1.3fr_1fr] lg:px-8">
          <div>
            <Reveal>
              <h2 className={h2}>Overview</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{course.description}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                <div><dt className="text-xs text-muted">Class</dt><dd className="font-medium">{course.classLabel}</dd></div>
                <div><dt className="text-xs text-muted">Subjects</dt><dd className="font-medium">{course.subjects}</dd></div>
                <div><dt className="text-xs text-muted">Duration</dt><dd className="font-medium">{course.duration}</dd></div>
                <div><dt className="text-xs text-muted">Mode</dt><dd className="font-medium">{admissionNote.mode}</dd></div>
                <div><dt className="text-xs text-muted">Admission</dt><dd className="font-medium text-primary">{admissionNote.admissionStatus}</dd></div>
              </dl>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className={`${h2} mt-10`}>Course Highlights</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {sharedHighlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-muted">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /> {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <h2 className={`${h2} mt-10`}>Admission Process</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {admissionSteps.map(([n, t, d]) => (
                  <div key={n} className="rounded-xl border border-border bg-surface p-4">
                    <span className="text-xs font-semibold text-primary">{n}</span>
                    <p className="mt-1.5 text-sm font-semibold">{t}</p>
                    <p className="mt-1 text-xs leading-5 text-muted">{d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                <CheckCircle2 className="size-4" /> 7 days free demo class available
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold">Fee details</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-muted">Course fee</dt><dd className="font-semibold">{formatFee(course)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Registration fee</dt><dd className="font-medium">₹{admissionNote.registrationFee}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Installments</dt><dd className="font-medium">Available</dd></div>
              </dl>
              <p className="mt-4 text-xs leading-5 text-muted">{admissionNote.discountNote}.</p>
              <a
                href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent(`Hello GM Classes, I want to enquire about ${course.name}.`)}`}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-foreground hover:-translate-y-0.5"
              >
                Enquire on WhatsApp <ArrowRight className="size-4" />
              </a>
              <a href={`tel:${s.phones[0].replace(/\s/g, "")}`} className="mt-2.5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-border px-6 font-semibold hover:border-primary/40">
                Call {s.phones[0]}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
