import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import type { Course } from "@/lib/courses";
import { formatFee, isClassCourse } from "@/lib/courses";

const categoryTone: Record<Course["category"], string> = {
  Regular: "border-primary/30 bg-primary/[0.07] text-[#7a5720]",
  "Entrance Exam": "border-emerald-700/25 bg-emerald-50 text-emerald-800",
  Competitive: "border-rose-700/25 bg-rose-50 text-rose-800",
  Foundation: "border-sky-700/25 bg-sky-50 text-sky-800",
  "Crash Course": "border-amber-700/30 bg-amber-50 text-amber-900",
};

function Field({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`min-w-0 ${wide ? "col-span-2" : ""}`}>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium leading-5 text-foreground">{value}</dd>
    </div>
  );
}



export function CourseCard({ course }: { course: Course }) {
  const hasFee = Number.isFinite(course.fee) && course.fee > 0;
  const unit = course.feeUnit === "/ year" ? "per year" : null;

  return (
    <article
      data-card="true"
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[0_8px_30px_-22px_rgba(34,27,17,.28)] transition-[transform,box-shadow,border-color] duration-300 motion-safe:hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_24px_50px_-30px_rgba(156,114,44,.55)]"
    >
      <div className="relative h-48 overflow-hidden border-b border-border bg-[radial-gradient(ellipse_at_65%_25%,rgba(220,187,112,.28),transparent_55%),linear-gradient(135deg,#f7f2e7,#eee7d8)] sm:h-52">
        {course.thumbnail ? (
          <Image src={course.thumbnail} alt={`${course.name} course information`} fill sizes="(min-width:1280px) 30vw, (min-width:640px) 45vw, 92vw" className={`${course.thumbnailFit === "contain" ? "object-contain p-1" : "object-cover object-center"} transition-transform duration-500 group-hover:scale-[1.015]`} />
        ) : (
          <div className="absolute inset-0 opacity-40" aria-hidden="true" style={{ backgroundImage: "linear-gradient(120deg, transparent 0 45%, rgba(255,255,255,.75) 45.2% 45.8%, transparent 46%), radial-gradient(circle at 15% 80%, rgba(156,114,44,.12) 0 2px, transparent 3px)", backgroundSize: "auto, 18px 18px" }} />
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {isClassCourse(course) && <span className="rounded-full border border-white/70 bg-white/90 px-3 py-1 text-[11px] font-bold text-[#3e3422] shadow-sm">{course.classLabel}</span>}
          <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] shadow-sm ${categoryTone[course.category]}`}>{course.category}</span>
        </div>
        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#6d5121] shadow-sm"><Sparkles className="size-3" /> GM Classes</div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">{course.name}</h3>
        {course.subjects && <p className="mt-1.5 text-sm leading-6 text-muted">{course.subjects}</p>}

        <div className="mt-4 flex flex-wrap gap-2">
          {course.board !== "—" && <span className="rounded-lg bg-surface px-2.5 py-1.5 text-xs font-medium text-muted">{course.board}</span>}
          {course.medium !== "—" && <span className="rounded-lg bg-surface px-2.5 py-1.5 text-xs font-medium text-muted">{course.medium} Medium</span>}
          <span className="rounded-lg bg-surface px-2.5 py-1.5 text-xs font-medium text-muted">{course.batchTiming || course.duration}</span>
        </div>

        <div className="mt-auto pt-5">
          <div className="relative mb-4 overflow-hidden rounded-lg border border-primary/15 bg-[#faf6ec] px-3 py-2">
            <div className="gm-course-fee-marquee flex w-max items-center gap-3 whitespace-nowrap text-xs font-semibold text-[#735522] motion-reduce:animate-none">
              {[0, 1].map((copy) => <span key={copy} className="flex items-center gap-3 pr-3"><span className="size-1.5 rounded-full bg-primary" />{course.classLabel} · {hasFee ? `${formatFee({ ...course, feeUnit: undefined })}${unit ? ` ${unit}` : ""}` : "Contact for fee details"}<span className="text-primary/45">✦</span> Admission Open <span className="text-primary/45">✦</span> 7 Days Free Demo</span>)}
            </div>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Course Fee</p>
              {hasFee ? <p className="mt-1 text-2xl font-bold leading-none tracking-tight text-foreground">{formatFee({ ...course, feeUnit: undefined })}{unit && <span className="ml-1 text-[10px] font-medium tracking-normal text-muted">/ year</span>}</p> : <p className="mt-1 text-sm font-semibold text-foreground">Contact for fee</p>}
            </div>
            <Link href={`/courses/${course.id}`} aria-label={`View details: ${course.name}`} className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl bg-foreground px-4 text-sm font-bold text-[#f3dfb0] transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
              View Details <ArrowRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
