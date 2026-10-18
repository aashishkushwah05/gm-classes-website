# GM Classes — Premium About Us + Student Testimonials

Scope: `/about` only (testimonials live on that page at `#testimonials`). Home, Courses, Results, Faculty, header and footer are unchanged. Brand kept as is: charcoal + gold (the site has no dark-mode toggle, so none was added or removed).
Note: the request text ended mid-sentence in Phase 9 ("No ke…"); everything up to that point was implemented.

## About page (`app/about/page.tsx`)
1. **Hero** — two columns on desktop, stacked on mobile. Eyebrow, H1 "Building strong foundations for a brighter future.", the institute's own About text, CTAs to `/admissions` (primary) and `/courses`, plus a one-line "Class 1 to 12 · MP Board & CBSE · Hindi & English medium". The real signboard photo is shown in a 4:5 frame; the address sits in a caption under the photo (no glass overlay).
2. **Our approach** — editorial numbered list (not cards) with the institute's philosophy as a pull-quote.
3. **Why students choose us** — real classroom photo + six plain facts in a hairline-divided grid.
4. **Learning journey** — Understand → Practise → Review progress → Prepare for the exam. Horizontal on large screens, vertical timeline on small ones. Captioned as a suggested flow, not a promise.
5. **Leadership** — kept (existing content), now with the image-loading lifecycle and the whole photo shown.
6. **Institute details** — name, classes/boards/medium, number of courses listed, teaching team, address, hours, phones, email, directions and admissions links. No counters or statistics.
7. **Student testimonials** — see below.
8. **Explore** + closing CTA — kept. The old stat strip was folded into "Institute details". Metadata and JSON-LD are unchanged.

### Where every statement comes from (nothing new was invented)
| Used on About | Existing source |
|---|---|
| About paragraph, philosophy, calm-location text | `config/site.ts` (`about`, `philosophy`, `usp`) |
| Regular tests, mock tests, performance tracking | FAQ: "regular tests", "mock tests", "How is performance tracked" |
| Assignments, important questions, subject-wise notes | FAQ "study material" |
| Doubt support, individual attention, mentorship | FAQ (doubts resolved by faculty; individual attention; mentorship) |
| Board-specific prep; Navodaya, PNST, ADDET, PVFT, JEE/NEET foundation | FAQ |
| Class 1 to 12; MP Board & CBSE; Hindi & English | FAQ |
| Installments; 7-day free demo | FAQ + Admissions page |
| Address, hours, phones, email, map link | `config/site.ts` |
| Director, subject list | `lib/faculty.ts`, Faculty page |
Not used (not confirmed): AC rooms, daily tests, digital classrooms, scholarships, awards, rankings, student totals, selection percentages, "small batches". The founding year in `config/site.ts` is not displayed anywhere (it is still in the existing JSON-LD `foundingDate`); please confirm it is correct.

## Testimonials (`lib/testimonials.ts`, `components/testimonials/*`)
- **Production data is empty on purpose.** `verifiedTestimonials` is `[]` until the institute supplies real reviews. The page then shows a polished empty state ("Student stories are coming soon", links to Results and Contact).
- **Demo data cannot reach production.** Demo cards (clearly badged "Demo content — not a real review", with a banner) appear only if `NODE_ENV !== "production"` AND `NEXT_PUBLIC_SHOW_DEMO_TESTIMONIALS=true`. Even then, real data always wins. Demo entries are stripped from the verified list if someone pastes them there.
- **Add a real review:** add one object to `verifiedTestimonials` (fields: `id`, `name`, `text`; optional `classLabel`, `rating` 1–5, `date`, `photo`). Photos are local files only (`/testimonials/…`); otherwise an initials avatar shows. No "verified" badge is shown (there is no verification process).
- **Safe by design:** invalid or empty entries, bad ratings/dates and external photo URLs are dropped or ignored; nothing crashes. Class filters appear only with at least 6 reviews across at least 2 real classes.
- **Layout:** grid of 1 / 2 / 3 columns. No carousel, no autoplay; everything is readable without interaction.

## Motion
- **Hero:** pure-CSS entrance (eyebrow 0 s → heading 0.08 s → paragraph 0.18 s → buttons 0.28 s → facts 0.36 s; image 0.12 s), 12–24 px movement, 600–750 ms. The headline is never held back by JavaScript.
- **Scroll reveals** (`components/ui/scroll-reveal.tsx`, IntersectionObserver, no new dependency): content is **visible by default**; only elements below the fold are hidden after the page loads, then revealed once with a small stagger (capped at 0.24 s). If JS or IntersectionObserver fails, nothing stays hidden. No replay when scrolling back.
- **Images** (`components/ui/lifecycle-image.tsx`): skeleton → real load event → fade-in; slow or failed image → branded GM-logo fallback; never an endless skeleton; no broken icons. Reuses `lib/image-status.ts` and `use-image-lifecycle.ts`.
- **Journey line** draws once on scroll. Buttons: hover, active (pressed), focus-visible ring. Cards: small lift on hover only.
- **Reduced motion:** no entrance movement or hiding anywhere; hover lifts and pulses are off.

## Files
Created: `components/ui/scroll-reveal.tsx`, `components/ui/lifecycle-image.tsx`, `components/about/learning-journey.tsx`, `components/testimonials/{testimonials-section,testimonial-grid,testimonial-card}.tsx`, `lib/testimonials.ts`
Modified: `app/about/page.tsx` (rewritten; metadata + JSON-LD kept verbatim), `app/globals.css` (+ about-hero keyframes, appended), `README.md`
Unchanged and still used elsewhere: `components/ui/reveal.tsx`.

## Tests actually run
- **Data rules (Node, 18 checks, all passed):** shipped production data is empty; production never yields demo data even with the flag on; development needs the flag; messy/invalid/duplicate/external-photo entries are handled; filter thresholds; date and initials helpers.
- **Real Chromium (Playwright), 181 checks, all passed, run twice with identical results.** The real component code was bundled with React 19 and exercised at 1440, 1024, 768, 390 (iPhone 13 emulation), 360 (Android emulation), with reduced motion, and with IntersectionObserver deleted (animation init failure):
  - hero entrance (the real CSS from `globals.css`): hidden during its delay, in place afterwards, instantly visible under reduced motion;
  - scroll reveal: server HTML is visible; on-screen content never flashes; below-fold content armed then shown once; no replay; never hidden under reduced motion or when IntersectionObserver is missing;
  - image lifecycle: normal, slow (3 s), invalid path, missing;
  - testimonials: production build shows the empty state and no demo text even with the demo flag set; development build shows labelled demo cards; filters only for existing classes and they work; rating label only when provided; bad photo → initials fallback, good photo fades in; no carousel;
  - journey: four steps in order; line undrawn → drawn once; steps all become visible while scrolling;
  - no console errors; no horizontal overflow in the harness.
- **Controls:** with the production gate and the fail-safe reveal deliberately broken, both test suites failed; restored, they pass.
- Limited `tsc` with library stubs: passed (stubs do not check real library prop types).

## NOT tested
- `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build` — sandbox has no network.
- The real Tailwind layout of the new About page (two-column hero, grids, spacing, contrast) and real `next/image`: not rendered. Overflow was checked in the harness only, not on the finished page at 360/390/768/1024/1440 px. Please check these in a browser.
- A real phone / mid-range Android performance.
- Navigation: only existing routes are linked (`/admissions`, `/courses`, `/contact`, `/results`, `/faculty`, `/faq`, `#testimonials`); not click-tested in a running site.

Run: `npm ci && npm run typecheck && npm run lint && npm run build && npm run dev`, then open `/about`. To preview the demo testimonials locally: `NEXT_PUBLIC_SHOW_DEMO_TESTIMONIALS=true npm run dev`.
