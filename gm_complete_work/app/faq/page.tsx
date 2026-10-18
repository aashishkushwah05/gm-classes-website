import type { Metadata } from "next";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { FaqExplorer } from "@/components/faq/faq-explorer";
import { faqs } from "@/lib/faq";
import { siteConfig as s } from "@/config/site";

export const metadata: Metadata = {
  title: "FAQs | GM Classes",
  description:
    "Frequently asked questions about GM Classes in Jetapur, Khargone — courses, fees, admissions, the 7-day free demo, batch timings, and more.",
  alternates: { canonical: "/faq" },
};

const eyebrow = "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary";
const h2 = "font-serif text-2xl font-semibold tracking-tight sm:text-3xl";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FaqPage() {
  return (
    <main id="main-content" className="gm-inner-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="gm-page-hero border-b border-border py-16 sm:py-20">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <p className={eyebrow}>Frequently Asked Questions</p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Everything you want to know about GM Classes
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              {faqs.length} verified answers on admissions, courses, fees, timings and more. Search or filter by
              category below — or contact us directly for anything not covered here.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <FaqExplorer />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16 sm:py-20">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-primary/30 bg-background p-7 sm:flex-row sm:items-center sm:p-9">
              <div>
                <p className={eyebrow}>Still have a question?</p>
                <h2 className={h2}>Get in touch with GM Classes for the latest admission, batch and course information.</h2>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-foreground shadow-[0_10px_30px_-14px_rgba(156,114,44,.9)] hover:-translate-y-0.5"
                >
                  Contact GM Classes <ArrowRight className="size-4" />
                </a>
                <a
                  href={`https://wa.me/${s.whatsapp}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary/40 px-6 font-semibold hover:bg-primary/10"
                >
                  <MessageCircle className="size-4 text-primary" /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
