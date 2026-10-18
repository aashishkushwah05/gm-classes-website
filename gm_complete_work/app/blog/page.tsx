import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { getFeaturedBlogPost, publishedBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | GM Classes",
  description:
    "Study guides, exam preparation ideas, learning habits and admission resources from GM Classes.",
  alternates: { canonical: "/blog" },
};

const eyebrow = "GM CLASSES BLOG";

export default function BlogPage() {
  const featured = getFeaturedBlogPost();

  return (
    <main id="main-content" className="gm-inner-page">
      <section className="gm-page-hero border-b border-border py-16 sm:py-20">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
              <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Practical ideas for better learning.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                Study guides, exam-preparation ideas, learning habits and useful admission resources — built around
                the information and approach already verified for GM Classes.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {featured ? (
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-5 lg:px-8">
            <Reveal>
              <div className="gm-blog-featured grid overflow-hidden rounded-3xl border border-border bg-surface lg:grid-cols-[1.05fr_0.95fr]">
                <div className="flex min-h-[320px] flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Featured article</p>
                  <span className="mt-5 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">{featured.category}</span>
                  <h2 className="mt-5 max-w-2xl font-serif text-3xl font-semibold tracking-tight sm:text-4xl">{featured.title}</h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{featured.excerpt}</p>
                  <Link href={`/blog/${featured.slug}`} className="mt-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/30">Read featured article <ArrowRight className="size-4" /></Link>
                </div>
                <div className="hidden border-l border-border bg-background p-8 lg:flex lg:flex-col lg:justify-end">
                  <p className="text-sm font-semibold text-foreground">A practical resource for students</p>
                  <p className="mt-2 text-sm leading-6 text-muted">Built as an editorial resource, with institute-specific information kept separate and verified through the FAQ and contact pages.</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featured.tags.map((tag) => <span key={tag} className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">{tag}</span>)}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Explore</p>
                <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Latest articles</h2>
              </div>
              <span className="hidden text-sm text-muted sm:block">{publishedBlogPosts.length} published articles</span>
            </div>
            <BlogExplorer excludeSlug={featured?.slug} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-14 sm:py-16">
        <div className="container mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="gm-blog-cta grid gap-7 rounded-3xl border border-border bg-background p-7 sm:p-9 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <div className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="size-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Need an answer now?</p>
                <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">Check the verified FAQ or talk to GM Classes.</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                  The blog is being built as a long-term resource. For current course, admission and demo information,
                  use the verified FAQ or contact the institute directly.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                <Link href="/faq" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold hover:border-primary/50 hover:bg-primary/5">
                  View FAQs <ArrowRight className="size-4" />
                </Link>
                <Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground hover:-translate-y-0.5">
                  Contact GM Classes <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
