"use client";

import { Star } from "lucide-react";
import { useImageLifecycle } from "@/components/ui/use-image-lifecycle";
import { keepImageMounted, showSkeleton } from "@/lib/image-status";
import { formatTestimonialDate, initials, type Testimonial } from "@/lib/testimonials";
import Image from "next/image";

/** Round photo with a real load lifecycle; initials are the neutral fallback (no stock photos, ever). */
function Avatar({ t }: { t: Testimonial }) {
  const { state, attach, onLoad, onError } = useImageLifecycle(t.photo ?? null);
  const loaded = state.status === "loaded";
  return (
    <div
      data-avatar-status={state.status}
      className="relative size-12 shrink-0 overflow-hidden rounded-full border border-border bg-primary/10"
    >
      <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-sm font-semibold text-[#7a5720]">
        {initials(t.name)}
      </span>
      {t.photo && keepImageMounted(state) && (
        <Image
          ref={attach}
          src={t.photo}
          alt={`Photo of ${t.name}`}
          fill
          sizes="48px"
          onLoad={onLoad}
          onError={onError}
          className={`object-cover transition-opacity duration-500 motion-reduce:transition-none ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
      {t.photo && showSkeleton(state) && <span aria-hidden="true" className="absolute inset-0 animate-pulse bg-border/40 motion-reduce:animate-none" />}
    </div>
  );
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  const date = formatTestimonialDate(t.date);
  return (
    <figure className="group relative flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_22px_48px_-32px_rgba(156,114,44,.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {t.isDemo && (
        <p className="mb-4 w-fit rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-warning">
          Demo content — not a real review
        </p>
      )}
      {t.rating && (
        <div role="img" aria-label={`Rated ${t.rating} out of 5`} className="mb-3 flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} aria-hidden="true" className={`size-4 ${i < t.rating! ? "fill-primary text-primary" : "text-border"}`} />
          ))}
        </div>
      )}
      <blockquote className="text-base leading-7 text-foreground">
        <p>&ldquo;{t.text}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-5">
        <Avatar t={t} />
        <div className="min-w-0">
          <p className="font-semibold leading-tight">{t.name}</p>
          {(t.classLabel || date) && (
            <p className="mt-0.5 text-sm text-muted">{[t.classLabel, date].filter(Boolean).join(" · ")}</p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
