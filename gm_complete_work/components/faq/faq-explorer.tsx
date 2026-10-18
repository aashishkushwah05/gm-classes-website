"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { faqs, faqCategories, type FaqEntry } from "@/lib/faq";

const ALL = "All";

function AccordionItem({ item, open, onToggle }: { item: FaqEntry; open: boolean; onToggle: () => void }) {
  const panelId = useId();
  return (
    <div className="rounded-xl border border-border bg-background">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <span>{item.question}</span>
          <ChevronDown className={`size-4 shrink-0 text-muted transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180 text-primary" : ""}`} />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm leading-6 text-muted">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const inCategory = category === ALL || f.category === category;
      if (!inCategory) return false;
      if (!q) return true;
      return (
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <label htmlFor="faq-search" className="sr-only">Search questions</label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {[ALL, ...faqCategories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                category === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-muted">
        {filtered.length} question{filtered.length === 1 ? "" : "s"}
        {category !== ALL ? ` in ${category}` : ""}
      </p>

      <div className="mt-4 space-y-3">
        {filtered.map((item) => (
          <AccordionItem key={item.id} item={item} open={openIds.has(item.id)} onToggle={() => toggle(item.id)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-sm font-medium">No matching questions found.</p>
          <p className="mt-1.5 text-sm text-muted">
            Try another search or{" "}
            <Link href="/contact" className="font-semibold text-primary hover:underline">
              contact GM Classes
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
