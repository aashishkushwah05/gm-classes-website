// Student testimonials — single data source (can later be swapped for a CMS / API without touching the UI).
//
// TRUST RULES
// - `verifiedTestimonials` is the ONLY production source. It is intentionally EMPTY until the institute
//   supplies real reviews with the student's / family's permission. Do not paste invented text here.
// - Demo data lives in `demoTestimonials`, is marked `isDemo`, and is shown only when BOTH are true:
//   NODE_ENV is not "production" AND NEXT_PUBLIC_SHOW_DEMO_TESTIMONIALS="true". It can never reach production,
//   and it never silently replaces real data.
// - Rating, date, photo and class are optional: add them only if they were genuinely provided.
//
// TO ADD A REAL TESTIMONIAL: add one object to `verifiedTestimonials` (unique `id`).
// A photo is optional: save it under public/testimonials/ and set `photo: "/testimonials/<file>.jpg"`.

export type Testimonial = {
  id: string;
  name: string;
  text: string;
  classLabel?: string; // e.g. "Class 10" — only if verified
  rating?: number; // whole number 1–5 — only if genuinely given
  date?: string; // ISO date, e.g. "2026-03-15" — only if known
  photo?: string; // local path under /public — only with permission
  isDemo?: boolean; // set only on demo data below
};

export const verifiedTestimonials: Testimonial[] = [
  // Example (commented out on purpose — replace with a REAL review supplied by the institute):
  // { id: "student-name-2026", name: "Student Name", classLabel: "Class 10", text: "The review text exactly as supplied.", rating: 5, date: "2026-03-15" },
];

export const demoTestimonials: Testimonial[] = [
  { id: "demo-1", name: "Demo Student A", classLabel: "Class 9", text: "DEMO TEXT — placeholder used only to preview this layout. This is not a real review.", rating: 5, isDemo: true },
  { id: "demo-2", name: "Demo Student B", classLabel: "Class 10", text: "DEMO TEXT — placeholder used only to preview this layout. This is not a real review. It is a little longer so the card height and line wrapping can be checked properly.", isDemo: true },
  { id: "demo-3", name: "Demo Student C", classLabel: "Class 12", text: "DEMO TEXT — placeholder used only to preview this layout. This is not a real review.", rating: 4, isDemo: true },
];

const MAX_RATING = 5;

/** Drops unusable entries and ignores invalid optional fields — never throws. */
export function sanitizeTestimonials(list: unknown, opts: { allowDemo: boolean }): Testimonial[] {
  if (!Array.isArray(list)) return [];
  const seen = new Set<string>();
  const out: Testimonial[] = [];
  for (const raw of list) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    const id = typeof r.id === "string" ? r.id.trim() : "";
    const name = typeof r.name === "string" ? r.name.trim() : "";
    const text = typeof r.text === "string" ? r.text.trim() : "";
    if (!id || !name || !text || seen.has(id)) continue;
    const isDemo = r.isDemo === true;
    if (isDemo && !opts.allowDemo) continue; // demo content can never appear in production
    seen.add(id);
    const rating = typeof r.rating === "number" && Number.isInteger(r.rating) && r.rating >= 1 && r.rating <= MAX_RATING ? r.rating : undefined;
    const classLabel = typeof r.classLabel === "string" && r.classLabel.trim() ? r.classLabel.trim() : undefined;
    const date = typeof r.date === "string" && !Number.isNaN(Date.parse(r.date)) ? r.date : undefined;
    const photo = typeof r.photo === "string" && r.photo.startsWith("/") && !r.photo.startsWith("//") ? r.photo : undefined; // local files only
    out.push({ id, name, text, classLabel, rating, date, photo, isDemo: isDemo || undefined });
  }
  return out;
}

export function getTestimonials(env: { nodeEnv?: string; showDemo?: string } = { nodeEnv: process.env.NODE_ENV, showDemo: process.env.NEXT_PUBLIC_SHOW_DEMO_TESTIMONIALS }) {
  const allowDemo = env.nodeEnv !== "production" && env.showDemo === "true";
  const verified = sanitizeTestimonials(verifiedTestimonials, { allowDemo: false });
  if (verified.length > 0) return { items: verified, usingDemo: false };
  if (allowDemo) return { items: sanitizeTestimonials(demoTestimonials, { allowDemo: true }), usingDemo: true };
  return { items: [] as Testimonial[], usingDemo: false };
}

/** Filters appear only when there is enough real data to need them. */
export function getClassFilters(items: Testimonial[]): string[] {
  if (items.length < 6) return [];
  const labels = [...new Set(items.map((t) => t.classLabel).filter((l): l is string => Boolean(l)))];
  return labels.length >= 2 ? labels : [];
}

export function formatTestimonialDate(date?: string) {
  if (!date) return undefined;
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? undefined : new Intl.DateTimeFormat("en-IN", { month: "short", year: "numeric" }).format(d);
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase() || "•";
}
