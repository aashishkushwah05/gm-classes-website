"use client";

import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { blogCategories, blogPosts, type BlogCategory } from "@/lib/blog";

export function BlogExplorer({ excludeSlug }: { excludeSlug?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | BlogCategory>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter((post) => {
      if (excludeSlug && post.slug === excludeSlug) return false;
      const categoryMatch = category === "All" || post.category === category;
      const textMatch = !q || `${post.title} ${post.excerpt} ${post.category} ${post.tags.join(" ")}`.toLowerCase().includes(q);
      return categoryMatch && textMatch;
    });
  }, [query, category, excludeSlug]);

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <label className="block">
          <span className="sr-only">Search blog topics</span>
          <span className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Search articles and topics..."
              className="min-h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </span>
        </label>
        <p className="text-sm text-muted lg:pb-3">{filtered.length} {filtered.length === 1 ? "article" : "articles"}</p>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2" aria-label="Blog categories">
        {blogCategories.map((item) => {
          const active = category === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={active}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="gm-blog-card group flex min-h-[245px] flex-col rounded-2xl border border-border bg-background p-6 shadow-[0_18px_50px_-42px_rgba(26,23,20,.55)] transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_55px_-38px_rgba(156,114,44,.3)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                  {post.category}
                </span>
                <span className="text-xs text-muted">{post.readTime}</span>
              </div>
              <h2 className="mt-6 font-serif text-2xl font-semibold leading-tight tracking-tight">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-foreground transition group-hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/25">
                Read article <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="font-serif text-2xl font-semibold">No matching topics</p>
          <p className="mt-2 text-sm text-muted">Try another search or choose a different category.</p>
        </div>
      )}
    </div>
  );
}
