import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock, GraduationCap, HelpCircle, MapPin, MessageCircle, Newspaper, Phone, UserRound } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { courses } from "@/lib/courses";
import { siteConfig as s } from "@/config/site";
import { faqs as faqEntries } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Admissions | GM Classes, Jetapur Khargone",
  description: "Learn about admission at GM Classes in Jetapur, Khargone — courses, counselling, 7-day free demo, enquiry and contact details.",
  alternates: { canonical: "/admissions" },
  openGraph: {
    title: "Admissions | GM Classes",
    description: "Admission enquiry, courses, counselling and the 7-day free demo at GM Classes.",
    type: "website",
  },
};

const eyebrow = "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary";
const h2 = "font-serif text-2xl font-semibold tracking-tight sm:text-3xl";
const steps = [
  ["01", "Enquiry", "Tell GM Classes the student’s class and course requirement."],
  ["02", "Counselling", "Discuss the suitable academic program, board, medium and batch."],
  ["03", "Course / Batch Selection", "Confirm the relevant course, timing and fee structure."],
  ["04", "7-Day Free Demo", "Experience the classes before deciding on admission."],
  ["05", "Admission", "Complete the registration and admission formalities at the centre."],
] as const;

const quickFaqs = faqEntries.filter((item) => ["adm-how", "adm-installments", "demo-free", "contact-phone"].includes(item.id)).slice(0, 4);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Admissions | GM Classes",
  description: "Admission information and enquiry options for GM Classes in Jetapur, Khargone.",
  url: "https://gm-classes-website.vercel.app/admissions",
  about: { "@type": "EducationalOrganization", name: s.fullName },
  mainEntity: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gm-classes-website.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Admissions", item: "https://gm-classes-website.vercel.app/admissions" },
    ],
  },
};

export default function AdmissionsPage() {
  return (
    <main id="main-content" className="gm-inner-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="gm-page-hero relative isolate overflow-hidden border-b border-border py-6 sm:py-9">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 -z-10 size-72 rounded-full bg-primary/10 blur-3xl gm-admission-orb" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-28 -z-10 size-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal><p className={eyebrow}>Admissions</p><h1 className="max-w-4xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Start the right academic journey for the student.</h1><p className="mt-3 max-w-2xl text-base leading-7 text-muted">Explore the available courses, speak with GM Classes, and use the 7-day free demo before you decide.</p></Reveal>
          <Reveal delay={0.1}><div className="mt-5 flex flex-col gap-3 sm:flex-row"><a href="#enquiry" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-foreground shadow-[0_12px_34px_-14px_rgba(156,114,44,.9)] hover:-translate-y-0.5">Start Admission Enquiry <ArrowRight className="size-4" /></a><a href={`https://wa.me/${s.whatsapp}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary/40 px-6 font-semibold hover:bg-primary/10"><MessageCircle className="size-4 text-primary" /> WhatsApp GM Classes</a></div></Reveal>
        </div>
      </section>
      <section aria-label="Helpful pages" className="relative overflow-hidden border-b border-border bg-surface py-8 sm:py-10">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-0 size-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative mx-auto px-5 lg:px-8">
          <Reveal><p className={eyebrow}>Explore GM Classes</p><h2 className={h2}>Need answers or study updates?</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">Open our FAQ page for common questions or visit the blog for helpful updates and learning resources.</p></Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Reveal delay={0.06}><Link href="/faq" className="group relative block h-full overflow-hidden rounded-2xl gm-admission-explore-card border border-primary/35 bg-[#17130d] p-5 text-white transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4ad61] hover:shadow-[0_24px_55px_-25px_rgba(156,114,44,.7)] sm:p-6"><span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-150"/><div className="relative flex items-start gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105"><HelpCircle className="size-6"/></span><div className="min-w-0"><h3 className="font-serif text-xl font-semibold tracking-tight">FAQ Page</h3><p className="mt-1 text-sm leading-6 text-muted">Find answers about admissions, courses, demo classes and more.</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#e6c77e]">Explore FAQs <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1"/></span></div></div></Link></Reveal>
            <Reveal delay={0.14}><Link href="/blog" className="group relative block h-full overflow-hidden rounded-2xl gm-admission-explore-card border border-primary/35 bg-[#17130d] p-5 text-white transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4ad61] hover:shadow-[0_24px_55px_-25px_rgba(156,114,44,.7)] sm:p-6"><span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-150"/><div className="relative flex items-start gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary transition-transform duration-300 group-hover:rotate-[4deg] group-hover:scale-105"><Newspaper className="size-6"/></span><div className="min-w-0"><h3 className="font-serif text-xl font-semibold tracking-tight">Blog Page</h3><p className="mt-1 text-sm leading-6 text-muted">Explore learning tips, academic updates and useful student resources.</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#e6c77e]">Read the Blog <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1"/></span></div></div></Link></Reveal>
          </div>
        </div>
      </section>
      <section className="py-14 sm:py-16"><div className="container mx-auto px-5 lg:px-8"><Reveal><p className={eyebrow}>How admission works</p><h2 className={h2}>A clear path from enquiry to admission.</h2></Reveal><div className="relative mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div aria-hidden="true" className="gm-admission-line pointer-events-none absolute left-[10%] right-[10%] top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent lg:block" />
          {steps.map(([n,t,d],i)=><Reveal key={n} delay={i*.08}><div className="gm-premium-card group relative h-full rounded-2xl border border-border bg-surface p-5">
            <div className="gm-premium-icon relative z-10 flex size-10 items-center justify-center rounded-full border border-primary/25 bg-background text-sm font-bold text-primary shadow-sm gm-admission-ring">{n}</div>
            <h3 className="mt-5 font-semibold">{t}</h3><p className="mt-2 text-sm leading-6 text-muted">{d}</p>
          </div></Reveal>)}
        </div></div></section>
      <section className="border-y border-border bg-surface py-14 sm:py-16"><div className="container mx-auto grid gap-5 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">{[[GraduationCap,"Classes 1–12","Academic programs across the institute’s class range."],[BookOpen,`${courses.length} listed courses`,`Explore the currently listed courses and their details.`],[CheckCircle2,"7-Day Free Demo","Try the classes before deciding on admission."],[UserRound,"Personal Guidance","Get guidance through the enquiry and counselling process."]].map(([Icon,title,desc],i)=>{const C=Icon as typeof GraduationCap;return <Reveal key={String(title)} delay={i*.06}><div className="gm-premium-card h-full rounded-3xl border border-border bg-background p-6"><C className="size-6 text-primary"/><h3 className="mt-5 font-semibold">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-muted">{String(desc)}</p></div></Reveal>})}</div></section>
      <section className="py-14 sm:py-16"><div className="container mx-auto px-5 lg:px-8"><Reveal><div className="gm-premium-card relative overflow-hidden rounded-3xl border border-primary/30 bg-background p-7 sm:p-9"><p className={eyebrow}>Try before you decide</p><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><h2 className={h2}>7-Day Free Demo</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Experience GM Classes before you commit to admission. Use the enquiry form to discuss the student’s class and course.</p></div><a href="#enquiry" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-foreground">Enquire for Demo <ArrowRight className="size-4" /></a></div></div></Reveal></div></section>
      <section id="enquiry" className="border-y border-border bg-surface py-14 sm:py-16"><div className="container mx-auto grid gap-8 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><Reveal><p className={eyebrow}>Admission enquiry</p><h2 className={h2}>Tell us about the student.</h2><p className="mt-3 max-w-md text-sm leading-6 text-muted">Share the basics and the enquiry will open in WhatsApp with the details filled in. There is no separate account or sign-up required.</p><div className="mt-7 space-y-4 text-sm"><a href={`tel:${s.phones[0].replace(/\s/g, "")}`} className="flex items-center gap-3 font-medium hover:text-primary"><Phone className="size-5 text-primary" /> {s.phones[0]}</a><a href={`https://wa.me/${s.whatsapp}`} className="flex items-center gap-3 font-medium hover:text-primary"><MessageCircle className="size-5 text-primary" /> WhatsApp</a><div className="flex items-center gap-3 text-muted"><Clock className="size-5 text-primary" /> {s.hours}</div></div></Reveal><Reveal delay={0.08}><div className="gm-premium-card rounded-3xl border border-border bg-background p-6 shadow-[0_18px_55px_-42px_rgba(30,24,16,.5)] sm:p-8"><EnquiryForm /></div></Reveal></div></section>
      <section className="border-y border-border bg-surface py-14 sm:py-16">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal><p className={eyebrow}>Before you enquire</p><h2 className={h2}>Useful information, in one place.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted">Review the current courses and verified FAQs, or use the contact details below if you need the latest admission or batch information.</p></Reveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <Reveal><Link href="/courses" className="group block h-full rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_45px_-30px_rgba(156,114,44,.45)]"><BookOpen className="size-5 text-primary transition-transform duration-300 group-hover:-translate-y-0.5"/><h3 className="mt-4 font-semibold">Explore Courses</h3><p className="mt-1 text-sm leading-6 text-muted">Review the currently listed academic programs before enquiring.</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">View courses <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5"/></span></Link></Reveal>
            <Reveal delay={0.06}><Link href="/faq" className="group block h-full rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_45px_-30px_rgba(156,114,44,.45)]"><HelpCircle className="size-5 text-primary transition-transform duration-300 group-hover:-translate-y-0.5"/><h3 className="mt-4 font-semibold">Browse FAQs</h3><p className="mt-1 text-sm leading-6 text-muted">Find verified answers about courses, demo, admission and more.</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">Read FAQs <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5"/></span></Link></Reveal>
            <Reveal delay={0.12}><Link href="/contact" className="group block h-full rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_45px_-30px_rgba(156,114,44,.45)]"><MapPin className="size-5 text-primary transition-transform duration-300 group-hover:-translate-y-0.5"/><h3 className="mt-4 font-semibold">Visit / Contact</h3><p className="mt-1 text-sm leading-6 text-muted">{s.address}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">Contact GM Classes <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5"/></span></Link></Reveal>
          </div>
          <Reveal delay={0.14}>
            <div className="mt-8 rounded-3xl border border-border bg-background p-6 sm:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-xl"><p className={eyebrow}>Quick answers</p><h3 className="font-serif text-2xl font-semibold tracking-tight">Still deciding what to ask?</h3><p className="mt-2 text-sm leading-6 text-muted">These are a few verified questions from the main FAQ. For the complete list, open the FAQ page.</p></div>
                <Link href="/faq" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-primary/30 px-4 text-sm font-bold text-primary transition-colors hover:bg-primary/10">View all FAQs <ArrowRight className="size-4"/></Link>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {quickFaqs.map((item) => <details key={item.id} className="group rounded-2xl border border-border bg-surface px-4 py-3"><summary className="cursor-pointer list-none pr-6 text-sm font-semibold outline-none marker:hidden focus-visible:ring-2 focus-visible:ring-primary/40">{item.question}</summary><p className="pt-2 text-sm leading-6 text-muted">{item.answer}</p></details>)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
