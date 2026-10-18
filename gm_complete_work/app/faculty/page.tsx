import type { Metadata } from "next";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { FacultyCard } from "@/components/faculty/faculty-card";
import { FacultyFeatured } from "@/components/faculty/faculty-featured";
import { faculty } from "@/lib/faculty";
import { siteConfig as s } from "@/config/site";

export const metadata: Metadata = {
  title: "Faculty — GM Classes, Jetapur Khargone",
  description:
    "Meet the GM Classes faculty in Khargone — subject-wise teachers for Maths, Science, Biology, Chemistry, SST, Hindi and English, led by Founder Vinod Kumar Gupta and Director Apoorva Sen.",
  alternates: { canonical: "/faculty" },
};

const eyebrow = "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary";

const founder = faculty.find((f) => f.isFounder)!;
const director = faculty.find((f) => f.isDirector)!;
const otherFaculty = faculty.filter((f) => !f.isDirector && !f.isFounder);

export default function FacultyPage() {
  const peopleJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: faculty.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: f.name,
        ...(f.designation ? { jobTitle: f.designation } : {}),
        worksFor: { "@type": "EducationalOrganization", name: s.fullName },
      },
    })),
  };

  return (
    <main id="main-content" className="gm-inner-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(peopleJsonLd) }} />

      <section className="gm-page-hero border-b border-border py-16 sm:py-20">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <p className={eyebrow}>Faculty</p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Meet Our Faculty</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              GM Classes is led by Founder Vinod Kumar Gupta and Director Apoorva Sen, with subject-wise faculty teaching Maths, Science,
              Biology, Chemistry, Social Studies, Hindi, English and History across classes.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-5 lg:px-8">
          <FacultyFeatured member={founder} />
          <div className="mt-7">
            <FacultyFeatured member={director} />
          </div>

          <Reveal>
            <h2 className="mt-14 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">Our Teaching Team</h2>
          </Reveal>
          {/* Flex-wrap keeps cards equal width and centres an incomplete last row. */}
          <ul className="mt-6 flex flex-wrap justify-center gap-5">
            {otherFaculty.map((member, i) => (
              <li
                key={member.id}
                className="w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-3.75rem)/4)]"
              >
                <FacultyCard member={member} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16 sm:py-20">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-primary/30 bg-background p-7 sm:flex-row sm:items-center sm:p-9">
              <div>
                <p className={eyebrow}>Have a question for our faculty?</p>
                <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                  Talk to us before you enrol.
                </h2>
              </div>
              <a
                href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent("Hello GM Classes, I'd like to know more about your faculty.")}`}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-foreground shadow-[0_10px_30px_-14px_rgba(156,114,44,.9)] hover:-translate-y-0.5"
              >
                <MessageCircle className="size-4" /> Enquire on WhatsApp <ArrowRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
