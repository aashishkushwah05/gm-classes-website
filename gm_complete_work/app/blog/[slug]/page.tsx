import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/reveal";
import { ShareButtons } from "@/components/blog/share-buttons";
import { blogPosts, getBlogPost, getRelatedBlogPosts, publishedBlogPosts } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.filter((post) => post.status === "published").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post || post.status !== "published") return {};
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      section: post.category,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post || post.status !== "published") notFound();

  const index = publishedBlogPosts.findIndex((item) => item.slug === post.slug);
  const relatedPosts = getRelatedBlogPosts(post.slug, 2);
  const previous = publishedBlogPosts[index - 1];
  const next = publishedBlogPosts[index + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Guru Mantra Classes" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://gm-classes-website.vercel.app/blog/${post.slug}` },
    articleSection: post.category,
        keywords: post.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://gm-classes-website.vercel.app" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://gm-classes-website.vercel.app/blog" },
          { "@type": "ListItem", position: 3, name: post.title, item: `https://gm-classes-website.vercel.app/blog/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <main id="main-content" className="gm-inner-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article>
        <section className="gm-page-hero border-b border-border py-14 sm:py-18 lg:py-20">
          <div className="container mx-auto px-5 lg:px-8">
            <Reveal>
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/25">
                <ArrowLeft className="size-4" aria-hidden="true" /> Back to Blog
              </Link>
              <div className="mt-8 max-w-4xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em]">
                  <span className="rounded-full bg-primary/10 px-3 py-1.5 text-primary">{post.category}</span>
                  <span className="inline-flex items-center gap-1.5 text-muted"><CalendarDays className="size-3.5" aria-hidden="true" /> {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                  <span className="inline-flex items-center gap-1.5 text-muted"><Clock3 className="size-3.5" aria-hidden="true" /> {post.readTime}</span>
                </div>
                <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{post.title}</h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{post.excerpt}</p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <span className="text-sm text-muted">By <span className="font-semibold text-foreground">{post.author}</span></span>
                  <ShareButtons title={post.title} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-5 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,760px)_280px] lg:justify-center lg:gap-16">
              <Reveal>
                <div className="space-y-10">
                  {post.sections.map((section, sectionIndex) => (
                    <section key={section.heading} id={`section-${sectionIndex + 1}`} className="scroll-mt-24">
                      <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">{section.heading}</h2>
                      <div className="mt-4 space-y-4 text-base leading-8 text-muted">
                        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                      {section.bullets ? (
                        <ul className="mt-5 space-y-3 rounded-2xl border border-border bg-surface p-5 text-sm leading-6 text-muted">
                          {section.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />{bullet}</li>)}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>
              </Reveal>

              <aside className="h-fit rounded-2xl border border-border bg-surface p-5 lg:sticky lg:top-24">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Article</p>
                <p className="mt-3 text-sm leading-6 text-muted">This article is part of the GM Classes editorial resource. For current institute-specific information, use the verified FAQ or contact page.</p>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">On this page</p>
                  <nav aria-label="Article sections" className="mt-3 space-y-1">
                    {post.sections.map((section, sectionIndex) => (
                      <a key={section.heading} href={`#section-${sectionIndex + 1}`} className="block rounded-lg px-2 py-1.5 text-sm text-muted hover:bg-background hover:text-foreground">{section.heading}</a>
                    ))}
                  </nav>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => <span key={tag} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted">{tag}</span>)}
                </div>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Explore GM Classes</p>
                  <div className="mt-3 grid gap-2 text-sm font-semibold">
                    <Link href="/courses" className="rounded-lg px-2 py-2 hover:bg-background hover:text-primary">Explore courses <ArrowRight className="ml-1 inline size-3.5" /></Link>
                    <Link href="/faq" className="rounded-lg px-2 py-2 hover:bg-background hover:text-primary">Read FAQs <ArrowRight className="ml-1 inline size-3.5" /></Link>
                    <Link href="/contact" className="rounded-lg px-2 py-2 hover:bg-background hover:text-primary">Ask about admission <ArrowRight className="ml-1 inline size-3.5" /></Link>
                  </div>
                </div>
                <Link href="/contact" className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/30">Contact GM Classes <ArrowRight className="size-4" /></Link>
              </aside>
            </div>
          </div>
        </section>
      </article>

      {relatedPosts.length > 0 ? (
        <section className="border-t border-border bg-surface py-14 sm:py-16">
          <div className="container mx-auto px-5 lg:px-8">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Continue reading</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight">Related articles</h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {relatedPosts.map((item) => (
                  <Link key={item.slug} href={`/blog/${item.slug}`} className="group rounded-2xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:border-primary/35 focus:outline-none focus:ring-2 focus:ring-primary/25">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-primary">{item.category}</span>
                    <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight group-hover:text-primary">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{item.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Read article <ArrowRight className="size-4" /></span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="border-t border-border py-10">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-5 lg:px-8">
          {previous ? <Link href={`/blog/${previous.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-foreground"><ArrowLeft className="size-4" /> Previous</Link> : <span />}
          {next ? <Link href={`/blog/${next.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-foreground">Next <ArrowRight className="size-4" /></Link> : <span />}
        </div>
      </section>
    </main>
  );
}
