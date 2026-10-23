import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Award, BookOpen, CalendarCheck, CheckCircle2, Clock, ClipboardList,
  GraduationCap, Instagram, Languages, MapPin, MessageCircle, NotebookText,
  Phone, Target, Trees, Trophy, Users,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { AnnouncementTicker } from "@/components/home/announcement-ticker";
import { StatsSection } from "@/components/home/stats-section";
import { InstituteGallery } from "@/components/home/institute-gallery";
import { AboutGallery } from "@/components/home/about-gallery";
import { siteConfig as s } from "@/config/site";

const eyebrow = "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary";
const h2 = "font-serif text-3xl font-semibold tracking-tight sm:text-4xl";

const trust = [
  [CalendarCheck, `Since ${s.establishedYear}`, "Serving Khargone students"],
  [BookOpen, "MP Board & CBSE", "Class 1 to 12"],
  [Languages, "Hindi + English", "Both mediums"],
  [Users, "Individual Attention", "Small, focused batches"],
] as const;

const usp = [
  [Trees, "Calm, focused location", "A quiet spot near Jitapur Nahar, away from the noise and crowd of the main city, so students can concentrate better."],
  [Target, "Concepts from the basics", "We build fundamentals first — once concepts are clear, advanced topics and board exams become far easier."],
  [Users, "Individual attention", "Small batches mean every student's doubts and progress are actually tracked, not lost in a crowd."],
] as const;

const programs = [
  [BookOpen, "Class 1 – 8", "All subjects · CBSE & MP Board · Hindi + English medium"],
  [GraduationCap, "Class 9 – 10", "All subjects · CBSE & MP Board"],
  [GraduationCap, "Class 11 – 12", "Maths, Physics, Chemistry, Biology · CBSE & MP Board"],
  [Trophy, "Navodaya Entrance", "Class 5th & 8th preparation"],
  [Target, "PNST · ADDET · PVFT · JEE/NEET Foundation", "Competitive exam coaching"],
  [Clock, "Crash Courses", "Class 8, 10, 11 and 12"],
] as const;

const assessment = [
  [ClipboardList, "Regular tests", "Subject-wise tests to track progress through the year."],
  [NotebookText, "Study material", "Assignments, important questions and subject-wise notes for every class."],
  [CheckCircle2, "Doubt support", "Students can get their doubts resolved directly from faculty."],
] as const;

const journey = [
  [GraduationCap, "Concepts"],
  [NotebookText, "Practice"],
  [Target, "Assessment"],
  [Trophy, "Confidence"],
] as const;

const admission = [
  ["01", "Visit the institute", "Meet the team at GM Classes to discuss your requirement."],
  ["02", "Counselling", "Get guidance on the right class, board, medium and batch."],
  ["03", "Select course & batch", "Confirm subjects, timing and fee structure."],
  ["04", "Registration", "Complete the admission formalities at the centre."],
] as const;

// Featured homepage achievers use verified records and the matching named image
// assets already present in public/results/photos. Class 12 is labelled as a
// subject achievement because an overall percentage is not available.
const achievers: { category: string; filled: boolean; image: string; name: string; badge: string; detail: string }[] = [
  {
    category: "Class 10 — Highest Verified Percentage",
    filled: true as const,
    image: "/results/photos/radhika-sisodiya.jpg",
    name: "Radhika Sisodiya",
    badge: "91%",
    detail: "Class 10 · 91%",
  },
  {
    category: "Class 12 — Subject Achievement",
    filled: true as const,
    image: "/results/photos/vaishali-sagore.jpg",
    name: "Vaishali Sagore",
    badge: "Subject Marks",
    detail: "Physics 95/100 · Biology 94/100 · Chemistry 85/100",
  },
  {
    category: "Navodaya / ADDET",
    filled: true as const,
    image: "/results/photos/sakshi-solanki.jpg",
    name: "Sakshi Solanki",
    badge: "Selected",
    detail: "ADDET",
  },
];

export default function HomePage() {
  return (
    <main id="main-content">
      {/* Premium home hero */}
      <section className="gm-home-hero relative isolate overflow-hidden border-b border-border">
        <div aria-hidden="true" className="gm-hero-grid pointer-events-none absolute inset-0 -z-10" />
        <div aria-hidden="true" className="gm-hero-orb gm-hero-orb-one pointer-events-none absolute -right-28 -top-28 -z-10 size-[28rem] rounded-full" />
        <div aria-hidden="true" className="gm-hero-orb gm-hero-orb-two pointer-events-none absolute -bottom-40 left-[18%] -z-10 size-[24rem] rounded-full" />
        <div className="container mx-auto grid items-center gap-12 px-5 py-12 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <Reveal>
              <p className="gm-hero-kicker mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur sm:text-xs">
                <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40" /><span className="relative inline-flex size-2 rounded-full bg-primary" /></span>
                Admissions open · Jetapur, Khargone
              </p>
            </Reveal>
            <Reveal delay={0.07}>
              <h1 className="max-w-2xl font-serif text-[3.25rem] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[5.2rem]">
                Learn with clarity.<br /><span className="gold-text">Grow with confidence.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xl text-xl font-medium tracking-tight text-secondary sm:text-2xl">{s.tagline}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted sm:text-base sm:leading-8">{s.about}</p>
            </Reveal>
            <Reveal delay={0.27}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/admissions" className="gm-hero-primary group inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[0_16px_34px_-16px_rgba(156,114,44,.85)] sm:text-base">Explore Admissions <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
                <a href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent("Hello GM Classes, I would like to know about courses and admission.")}`} className="gm-hero-secondary inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-border bg-white/75 px-6 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition-colors hover:border-primary/40 hover:bg-white sm:text-base"><MessageCircle className="size-4 text-primary" /><span className="gm-hero-secondary-label">Talk to GM Classes</span></a>
              </div>
            </Reveal>
            <Reveal delay={0.34}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border/80 pt-5 text-xs font-medium text-secondary sm:text-sm">
                <span className="inline-flex items-center gap-2"><BookOpen className="size-4 text-primary" /> Classes 1–12</span>
                <span className="hidden h-4 w-px bg-border sm:block" />
                <span className="inline-flex items-center gap-2"><GraduationCap className="size-4 text-primary" /> MP Board &amp; CBSE</span>
                <span className="hidden h-4 w-px bg-border sm:block" />
                <span className="inline-flex items-center gap-2"><Languages className="size-4 text-primary" /> Hindi &amp; English</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            <InstituteGallery />
            <div aria-hidden="true" className="absolute -bottom-4 right-5 -z-10 size-24 rounded-full border border-primary/25 sm:right-8 sm:size-32" />
          </Reveal>
        </div>
      </section>

      <AnnouncementTicker />

      {/* Trust */}
      <section className="relative z-10 border-b border-border bg-surface/90 backdrop-blur">
        <ul className="container mx-auto grid grid-cols-2 px-5 lg:grid-cols-4 lg:px-8">
          {trust.map(([Icon, title, sub], i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 0.06}
              className="flex items-center gap-3 border-border px-4 py-6 transition-colors first:border-l-0 hover:bg-primary/5 sm:px-6 [&:nth-child(2)]:border-l [&:nth-child(3)]:border-t [&:nth-child(4)]:border-t lg:[&:nth-child(2)]:border-t-0 lg:[&:nth-child(3)]:border-l lg:[&:nth-child(3)]:border-t-0 lg:[&:nth-child(4)]:border-l lg:[&:nth-child(4)]:border-t-0"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div><p className="text-sm font-semibold sm:text-base">{title}</p><p className="text-xs text-muted">{sub}</p></div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Guidance → Growth */}
      <section className="overflow-hidden py-20 sm:py-24">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal><div className="mx-auto max-w-2xl text-center"><p className={eyebrow}>Guidance to growth</p><h2 className={h2}>Right direction today, confident results tomorrow.</h2></div></Reveal>

          <div className="relative mt-14 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Leadership portraits — founder first, director below */}
            <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-none">
              <Reveal className="relative mx-auto w-full min-w-0 max-w-xs lg:max-w-none">
                <div className="absolute -inset-3 -z-10 rounded-[2rem] border border-primary/20" aria-hidden="true" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_70px_-40px_rgba(57,42,17,.4)]">
                  <Image src="/director.jpg" alt="Mr. Vinod Kumar Gupta, Founder of GM Classes" fill sizes="(min-width:1024px) 32vw, 80vw" className="object-contain object-center" />
                </div>
                <div className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2 rounded-2xl border border-border bg-background px-5 py-2.5 text-center shadow-[0_18px_40px_-24px_rgba(57,42,17,.35)]">
                  <p className="text-sm font-semibold">Mr. Vinod Kumar Gupta</p>
                  <p className="text-[11px] text-muted">Founder</p>
                </div>
              </Reveal>
              <Reveal delay={0.14} className="relative mx-auto mt-2 w-full min-w-0 max-w-xs lg:mt-0 lg:max-w-none">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_55px_-38px_rgba(57,42,17,.38)]">
                  <Image src="/faculty/apoorva-sen-director.jpg" alt="Mrs. Apoorva Sen, Director of GM Classes" fill sizes="(min-width:1024px) 32vw, 80vw" className="object-contain object-center" />
                </div>
                <div className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2 rounded-2xl border border-border bg-background px-5 py-2.5 text-center shadow-[0_18px_40px_-24px_rgba(57,42,17,.35)]">
                  <p className="text-sm font-semibold">Miss Apoorva Sen</p>
                  <p className="text-[11px] text-muted">Director</p>
                </div>
              </Reveal>
            </div>

            {/* Journey + message */}
            <div>
              <Reveal delay={0.1}>
                <div className="flex flex-wrap items-center gap-3">
                  {journey.map(([Icon, label], i) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="flex items-center gap-2 rounded-full border border-primary/25 bg-surface px-3.5 py-2">
                        <Icon className="size-4 text-primary" />
                        <span className="text-xs font-semibold">{label}</span>
                      </div>
                      {i < journey.length - 1 && <span className="hidden h-px w-5 border-t border-dashed border-border sm:block" />}
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 text-xl italic leading-9 text-secondary sm:text-2xl">
                  &ldquo;The right guidance today shapes a confident, capable student tomorrow.&rdquo;
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <p className="mt-6 max-w-lg text-sm leading-7 text-muted">{s.philosophy}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-border py-20 sm:py-24">
        <div className="container mx-auto grid items-center gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:px-8">
          <Reveal>
            <AboutGallery />
          </Reveal>
          <Reveal delay={0.1}>
            <p className={eyebrow}>About GM Classes</p>
            <h2 className={h2}>Guru Mantra Classes, Khargone</h2>
            <p className="mt-5 text-base leading-7 text-muted">{s.about}</p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3">More about us <ArrowRight className="size-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* Why / USP */}
      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal><p className={eyebrow}>Why GM Classes</p><h2 className={h2}>Padhai jo samajh aaye, result jo dikhe.</h2></Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {usp.map(([Icon, t, d], i) => (
              <Reveal key={t} delay={i * 0.08} className="gm-card-reveal">
                <div className="gm-home-card h-full rounded-2xl border border-border bg-background p-6">
                  <Icon className="size-7 text-primary" />
                  <h3 className="mt-6 text-xl font-semibold">{t}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching philosophy */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className={eyebrow}>Teaching philosophy</p>
              <h2 className={h2}>Concept → Practice → Assessment → Confidence</h2>
              <p className="mt-5 text-base leading-7 text-muted">{s.philosophy}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Programs */}
      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal><p className={eyebrow}>Classes &amp; programs</p><h2 className={h2}>Har class, har goal ke liye sahi raasta.</h2></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map(([Icon, title, sub], i) => (
              <Reveal key={title} delay={(i % 3) * 0.08} className="gm-card-reveal">
                <div className="gm-home-card group h-full rounded-2xl border border-border bg-background p-6 transition-all duration-300">
                  <Icon className="size-7 text-primary" />
                  <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><Link href="/courses" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3">View all courses &amp; fees <ArrowRight className="size-4" /></Link></Reveal>
        </div>
      </section>

      {/* Tests & study material */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal><p className={eyebrow}>Tests &amp; study material</p><h2 className={h2}>Learning that&apos;s tracked, not left to chance.</h2></Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {assessment.map(([Icon, t, d], i) => (
              <Reveal key={t} delay={i * 0.08} className="gm-card-reveal">
                <div className="gm-home-card h-full rounded-2xl border border-border bg-surface p-6">
                  <Icon className="size-7 text-primary" />
                  <h3 className="mt-6 text-lg font-semibold">{t}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="container mx-auto grid items-center gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-primary/30">
              <Image src="/director.jpg" alt="Mr. Vinod Kumar Gupta, Founder of GM Classes" fill sizes="(min-width:768px) 30vw, 90vw" className="object-contain object-center" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={eyebrow}>Message from the Founder</p>
            <h2 className={h2}>Mr. Vinod Kumar Gupta <span className="text-muted">(V.K. Gupta Sir)</span></h2>
            <p className="mt-3 text-sm font-medium text-primary">M.Sc. (Maths) + B.Ed. · 10+ years of teaching · Maths, Physics &amp; Science</p>
            <blockquote className="mt-6 border-l-2 border-primary pl-5 text-lg leading-8 text-secondary">
              &ldquo;हर बच्चे में सीखने की क्षमता होती है — ज़रूरत है सही दिशा और भरोसे की। GM Classes में हम concepts पक्के करते हैं, ताकि रिज़ल्ट मेहनत का स्वाभाविक नतीजा बने।&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Achievers */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal><p className={eyebrow}>Our Achievers</p><h2 className={h2}>Hamare students ki safalta.</h2></Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {achievers.map((a, i) => (
              <Reveal key={a.category} delay={i * 0.1} className="gm-card-reveal">
                <div className="group h-full overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(156,114,44,.45)]">
                  {a.filled ? (
                    <>
                      <div className="relative aspect-[4/4.5] overflow-hidden bg-surface sm:aspect-[4/4.2]">
                        <Image
                          src={a.image}
                          alt={`${a.name}, ${a.category} achiever at GM Classes`}
                          fill
                          sizes="(min-width:768px) 33vw, 100vw"
                          className="object-contain p-2 transition-opacity duration-500"
                        />
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground shadow-sm">
                          <Award className="size-3.5" /> {a.badge}
                        </span>
                      </div>
                      <div className="p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{a.category}</p>
                        <p className="mt-1.5 text-lg font-semibold">{a.name}</p>
                        <p className="mt-0.5 text-sm text-muted">{a.detail}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-surface p-6 text-center">
                      <div className="grid size-16 place-items-center rounded-full border border-dashed border-border text-muted">
                        <Users className="size-7" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{a.category}</p>
                        <p className="mt-1 text-sm text-muted">Achiever details coming soon</p>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><Link href="/results" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3">View All Achievers <ArrowRight className="size-4" /></Link></Reveal>
        </div>
      </section>

      <StatsSection />

      {/* Admission process */}
      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal><p className={eyebrow}>Admission process</p><h2 className={h2}>Simple, offline and personal.</h2></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {admission.map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 0.08} className="gm-card-reveal">
                <div className="gm-home-card h-full rounded-2xl border border-border bg-background p-6">
                  <span className="text-sm font-semibold text-primary">{n}</span>
                  <h3 className="mt-6 text-lg font-semibold">{t}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><p className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"><CheckCircle2 className="size-4" /> 7 days free demo class available</p></Reveal>
        </div>
      </section>

      {/* Dedicated YouTube learning spotlight */}
      <section className="relative overflow-hidden border-y border-red-500/20 bg-gradient-to-br from-[#101827] via-[#151b2b] to-[#281316] py-16 sm:py-20">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-3xl border border-red-400/30 bg-white/[0.04] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.22)] sm:p-9 md:grid-cols-[auto_1fr_auto]">
              <a href={s.youtube} target="_blank" rel="noopener noreferrer" aria-label="Open GM Classes YouTube channel" className="mx-auto grid size-24 shrink-0 place-items-center rounded-2xl border border-red-300/40 bg-white p-3 shadow-lg transition hover:-translate-y-1 sm:size-28">
                <Image src="/social/youtube.jpg" alt="YouTube logo" width={88} height={88} className="size-full object-contain" />
              </a>
              <div className="text-center md:text-left">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-red-300">GM Classes · Free learning content</p>
                <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">Learn beyond the classroom</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">Explore educational lectures and concept explanations on the GM Classes YouTube channel. Visit the channel to discover the lessons available for your class.</p>
              </div>
              <a href={s.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300">Watch lectures <ArrowRight className="size-4" /></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Social links: visible, animated brand tiles */}
      <section id="connect" className="gm-social-section relative isolate overflow-hidden py-20 sm:py-24">
        <div className="gm-social-aurora gm-social-aurora-one" aria-hidden="true" />
        <div className="gm-social-aurora gm-social-aurora-two" aria-hidden="true" />
        <div className="container relative z-10 mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="gm-social-eyebrow">Stay connected</p>
              <h2 className="gm-social-heading mt-3 font-serif text-3xl font-semibold sm:text-5xl">Connect with GM Classes</h2>
              <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">Follow updates, explore learning content, or message us about admissions.</p>
            </div>
          </Reveal>
          <div className="gm-social-grid mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-2">
            <Reveal delay={0.04}>
              <a href={s.instagram} target="_blank" rel="noopener noreferrer" className="gm-social-card gm-social-instagram group">
                <span className="gm-social-image-wrap"><Image src="/social/instagram.jpg" alt="Instagram" width={88} height={88} className="gm-social-image" /></span>
                <span className="min-w-0"><strong>Instagram</strong><small>Updates &amp; announcements</small></span><ArrowRight className="gm-social-arrow" />
              </a>
            </Reveal>
            <Reveal delay={0.2}>
              <a href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent('Hello GM Classes, I would like to enquire about admission.')}`} target="_blank" rel="noopener noreferrer" className="gm-social-card gm-social-whatsapp group">
                <span className="gm-social-image-wrap"><Image src="/social/whatsapp.jpg" alt="WhatsApp" width={88} height={88} className="gm-social-image" /></span>
                <span className="min-w-0"><strong>WhatsApp</strong><small>Ask about admission</small></span><ArrowRight className="gm-social-arrow" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact + Map */}
      <section className="py-20 sm:py-24" id="contact">
        <div className="container mx-auto grid gap-6 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="h-full rounded-3xl border border-primary/30 bg-surface p-7 sm:p-9">
              <p className={eyebrow}>Ready to strengthen your concepts?</p>
              <h2 className={h2}>Let’s plan the next step.</h2>
              <ul className="mt-7 space-y-4 text-sm">
                {s.phones.map((p) => <li key={p} className="flex items-center gap-3"><Phone className="size-5 text-primary" /><a href={`tel:${p.replace(/\s/g, "")}`} className="text-base font-medium hover:text-primary">{p}</a></li>)}
                <li className="flex items-center gap-3"><MessageCircle className="size-5 text-primary" /><a href={`https://wa.me/${s.whatsapp}`} className="text-base font-medium hover:text-primary">WhatsApp: +91 88896 03862</a></li>
                <li className="flex items-center gap-3"><Instagram className="size-5 text-primary" /><a href={s.instagram} target="_blank" rel="noopener noreferrer" className="text-base font-medium hover:text-primary">Instagram</a></li>
                <li className="flex items-start gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-primary" /><span className="text-base">{s.name} — {s.address}</span></li>
                <li className="flex items-center gap-3"><Clock className="size-5 text-primary" /><span className="text-base">{s.hours}</span></li>
              </ul>
              <a href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent("Hello GM Classes, I want to enquire about admission.")}`} className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-foreground hover:-translate-y-0.5 sm:w-auto">Enquire on WhatsApp <ArrowRight className="size-4" /></a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="gm-location-card relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl p-7 sm:p-9">
              <div className="gm-location-halo" aria-hidden="true" />
              <MapPin className="gm-location-pin absolute right-7 top-7 size-16 sm:right-8 sm:top-8 sm:size-20" />
              <p className="gm-location-eyebrow text-sm font-bold uppercase tracking-[0.2em]">Find us</p>
              <h3 className="gm-location-address mt-3 max-w-xl text-2xl font-bold leading-tight sm:text-3xl">{s.address}</h3>
              <p className="gm-location-description mt-3 text-sm sm:text-base">Near the canal (Nahar), Jetapur, Khargone</p>
              <a href={s.maps} target="_blank" rel="noopener noreferrer" className="gm-directions-button mt-7 inline-flex min-h-14 items-center justify-center gap-3 self-start rounded-xl px-7 py-3 font-bold">Get Directions <ArrowRight className="size-5" /></a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
