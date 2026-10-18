import Link from "next/link";
import { ArrowRight, MessageCircle, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getClassFilters, getTestimonials } from "@/lib/testimonials";
import { TestimonialGrid } from "./testimonial-grid";

const btnSecondary =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 font-semibold transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/50 hover:bg-primary/[0.05] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

/** Student Testimonials. Renders only genuine data (see lib/testimonials.ts); otherwise a polished empty state. */
export function TestimonialsSection() {
  const { items, usingDemo } = getTestimonials();

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="scroll-mt-24 border-t border-border py-14 sm:py-16">
      <div className="container mx-auto px-5 lg:px-8">
        <ScrollReveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Student voices</p>
          <h2 id="testimonials-title" className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
            Experiences that matter
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            What students and families say about learning at GM Classes, in their own words.
          </p>
        </ScrollReveal>

        {usingDemo && (
          <p role="note" className="mt-6 rounded-xl border border-warning/40 bg-warning/10 px-4 py-3 text-sm font-medium text-warning">
            Development preview: the testimonials below are demo content and are never shown in production.
          </p>
        )}

        <div className="mt-8">
          {items.length > 0 ? (
            <TestimonialGrid items={items} filters={getClassFilters(items)} />
          ) : (
            <ScrollReveal>
              <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-10 text-center sm:px-10 sm:py-12">
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
                  <Quote className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">Student stories are coming soon</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted">
                  We share a student&rsquo;s experience only with the student&rsquo;s and family&rsquo;s permission. Until then, you can
                  see verified results, meet the faculty, or try the 7-day free demo and decide for yourself.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href="/results" className={btnSecondary}>
                    View verified results <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link href="/contact" className={btnSecondary}>
                    <MessageCircle className="size-4 text-primary" aria-hidden="true" /> Ask about the free demo
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
