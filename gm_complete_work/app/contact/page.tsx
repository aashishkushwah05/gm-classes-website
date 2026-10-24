import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { quickFaqs } from "@/lib/faq";
import { siteConfig as s } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact & Admissions — GM Classes, Jetapur Khargone",
  description:
    "Contact GM Classes in Jetapur, Khargone for admission enquiries — phone, WhatsApp, email, address, working hours, map, admission process and a 7-day free demo.",
  alternates: { canonical: "/contact" },
};

const eyebrow = "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary";
const h2 = "font-serif text-2xl font-semibold tracking-tight sm:text-3xl";

const admissionSteps = [
  ["01", "Enquiry", "Reach out by phone, WhatsApp, or the form on this page."],
  ["02", "Counselling", "Get guidance on the right class, board, medium and batch."],
  ["03", "Course / Batch Selection", "Confirm subjects, timing and fee structure."],
  ["04", "7-Day Free Demo", "Try the classes before you decide — no commitment needed."],
  ["05", "Admission", "Complete registration and formalities at the centre."],
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://gm-classes-website.vercel.app/#organization",
  name: s.fullName,
  alternateName: s.name,
  url: "https://gm-classes-website.vercel.app",
  description: s.about,
  foundingDate: String(s.establishedYear),
  founder: { "@type": "Person", name: "Vinod Kumar Gupta" },
  employee: { "@type": "Person", name: "Apoorva Sen", jobTitle: "Director" },
  email: s.email,
  telephone: s.phones[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nahar Marg, Sanawad Road, Jetapur",
    addressLocality: s.city,
    addressRegion: s.state,
    postalCode: s.pin,
    addressCountry: "IN",
  },
  areaServed: { "@type": "City", name: s.city },
  contactPoint: [{
    "@type": "ContactPoint",
    telephone: s.phones[0],
    contactType: "admissions",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  }],
  sameAs: [s.instagram, s.youtube?.split("?")[0]].filter(Boolean),
};

export default function ContactPage() {
  return (
    <main id="main-content" className="gm-inner-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="gm-page-hero border-b border-border py-10 sm:py-14">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <p className={eyebrow}>Contact &amp; Admissions</p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Let&apos;s plan your next academic step.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              Reach GM Classes directly, or fill the enquiry form below — our team will get back to you about the
              right class, batch and course for you.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#enquiry" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-bold text-primary-foreground shadow-[0_12px_34px_-14px_rgba(156,114,44,.9)] hover:-translate-y-0.5">
                Enquire for Admission <ArrowRight className="size-4" />
              </a>
              <a href={`https://wa.me/${s.whatsapp}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary/40 px-6 text-base font-semibold hover:bg-primary/10">
                <MessageCircle className="size-4 text-primary" /> Talk on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact info + Map */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto grid gap-6 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="gm-contact-card h-full rounded-3xl border border-border bg-surface p-7 sm:p-9">
              <h2 className={h2}>{s.name}</h2>
              <ul className="mt-6 space-y-4 text-sm">
                {s.phones.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <Phone className="size-5 text-primary" />
                    <a href={`tel:${p.replace(/\s/g, "")}`} className="font-medium hover:text-primary">{p}</a>
                  </li>
                ))}
                <li className="flex items-center gap-3">
                  <MessageCircle className="size-5 text-primary" />
                  <a href={`https://wa.me/${s.whatsapp}`} className="font-medium hover:text-primary">WhatsApp: {s.phones[0]}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-5 text-primary" />
                  <a href={`mailto:${s.email}`} className="font-medium hover:text-primary">{s.email}</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>{s.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="size-5 text-primary" />
                  <span>{s.hours}</span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="gm-contact-map flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border">
              <div className="relative isolate overflow-hidden bg-[#101010] px-5 py-5 text-white sm:px-7 sm:py-6">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(224,173,55,0.24),transparent_58%)]" />
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#d7ad49]/45 bg-[#d7ad49]/10 text-[#e7c46c] sm:size-12">
                    <MapPin className="size-5 sm:size-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e7c46c] sm:text-xs">Find us here</p>
                    <h2 className="mt-1 font-serif text-xl font-semibold leading-tight sm:text-2xl">Visit GM Classes</h2>
                    <p className="mt-1.5 break-words text-sm leading-6 text-white/75">{s.address}</p>
                  </div>
                </div>
                <div aria-hidden="true" className="mt-4 h-px w-full bg-gradient-to-r from-[#d7ad49]/70 via-[#d7ad49]/25 to-transparent" />
                <p className="mt-3 text-xs text-white/60">Jetapur, Khargone · Madhya Pradesh</p>
              </div>
              <iframe
                title="GM Classes location map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(s.address)}&output=embed`}
                className="h-64 w-full shrink-0 border-0 sm:h-80 lg:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={s.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-t border-border bg-surface px-6 py-3.5 text-sm font-semibold text-primary hover:bg-primary/5"
              >
                Open in Google Maps <ArrowRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Admission process */}
      <section className="border-y border-border bg-surface py-14 sm:py-16">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal><p className={eyebrow}>Admission process</p><h2 className={h2}>From enquiry to admission, in five steps.</h2></Reveal>
          <div className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {admissionSteps.map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 0.07}>
                <div className="gm-contact-step h-full rounded-2xl border border-border bg-background p-5">
                  <span className="text-sm font-semibold text-primary">{n}</span>
                  <p className="mt-4 text-base font-semibold">{t}</p>
                  <p className="mt-1.5 text-xs leading-5 text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7-day demo CTA */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="gm-contact-demo flex flex-col items-start justify-between gap-6 rounded-3xl border border-primary/30 bg-background p-7 sm:flex-row sm:items-center sm:p-9">
              <div>
                <p className={eyebrow}>Try before you decide</p>
                <h2 className={h2}>7-Day Free Demo</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                  Experience GM Classes&apos; teaching for a full week, free, before you commit to admission.
                </p>
              </div>
              <a href="#enquiry" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-foreground shadow-[0_10px_30px_-14px_rgba(156,114,44,.9)] hover:-translate-y-0.5">
                Start Your Enquiry <ArrowRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" className="border-t border-border bg-surface py-14 sm:py-16">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <p className={eyebrow}>Admission enquiry</p>
            <h2 className={h2}>Tell us about the student.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              This form doesn&apos;t go to a server — it opens WhatsApp with your details pre-filled, sent directly
              to GM Classes.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="gm-contact-form mt-8 max-w-2xl rounded-3xl border border-border bg-background p-6 sm:p-8">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quick questions */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal><p className={eyebrow}>Quick questions</p><h2 className={h2}>Before you reach out.</h2></Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {quickFaqs.map((item, i) => (
              <Reveal key={item.id} delay={Math.min(i * 0.05, 0.3)}>
                <div className="gm-contact-faq h-full rounded-2xl border border-border bg-surface p-5">
                  <p className="flex items-start gap-2 text-sm font-semibold">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /> {item.question}
                  </p>
                  <p className="mt-2 pl-6 text-sm leading-6 text-muted">{item.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <Link href="/faq" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3">
              View All FAQs <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
