# GM Classes — Courses Page Premium Update

Base: Phase 5 project. Scope: Courses listing page only (detail page: one label tweak).

## New page structure (`/courses`)
1. **Hero** — "Coaching for Class 1 to 12, all in one place", with the three admission highlights directly under it.
2. **Admission highlights** (3 distinct items, `admission-highlights.tsx`)
   - Registration Fee **₹500** (gold emphasis, labelled "Separate from the course fee")
   - **Installments Available** (green accent; "Enquire for installment details" — no terms invented)
   - **Discounted fee available for early / starting seats** (existing wording; "Enquire for applicable details" — no %, deadline or seat count)
3. **Class discovery** (`class-selector.tsx`) — static, no marquee/auto-scroll
   - Classes **1–12** as tiles grouped into Classes 1–5 (Foundational), 6–8 (Middle), 9–10 (Secondary), 11–12 (Senior Secondary)
   - Each tile shows its real course count, or "Enquire" when no course record exists
   - A "Competitive & Foundation" tile (PNST/ADDET/PVFT, JEE/NEET) and an "All courses" button
   - Selected class is shown with a charcoal/gold active state (animated, reduced-motion safe), `aria-pressed`, native buttons (keyboard + touch friendly)
4. **Refine** — existing Board / Medium filters plus Course Type (Regular, Entrance Exam, Competitive, Foundation, Crash Course). Chips wrap instead of scrolling horizontally. "Clear refinements" and "Show all courses" reset controls.
5. **Results** — live count (`role="status"`), responsive grid (1 / 2 / 3 columns), restrained stagger.
6. **Empty states** — (a) class without a course record: "GM Classes coaches Class N" + WhatsApp enquiry + show-all; (b) filters with no match: clear refinements / show all.
7. Existing "Still deciding?" contact section is unchanged.

## How Classes 1–12 are handled
Course data (`lib/courses.ts`) has records only for Class 5 (Navodaya), 8, 9, 10, 11, 12, plus PNST/ADDET/PVFT and JEE/NEET Foundation.
Classes **1, 2, 3, 4, 6, 7 have no records** — they are selectable and lead to an enquiry path. No courses, fees, boards or timings were invented.
Each existing course appears in exactly one class selection (verified: 23 courses = 23 mappings).

## Course cards (`course-card.tsx`)
Class chip + type badge → course name (wraps fully) → subjects → labelled Board / Medium / Class Timing fields (Duration shown instead when no timing exists) → fee panel pinned to the bottom ("Course Fee", Indian-rupee format, "per year" for annual fees, "Contact for fee details" if a fee were ever missing) → "View Details" button with arrow motion. Equal-height cards; links unchanged (`/courses/[id]`).

## Files changed
- `app/courses/page.tsx` — new hero, highlights, metadata description (Class 1–12 wording)
- `components/courses/courses-explorer.tsx` — rewritten (single filter system; no duplicate selectors)
- `components/courses/course-card.tsx` — redesigned
- `components/courses/class-selector.tsx` — **new**
- `components/courses/admission-highlights.tsx` — **new**
- `lib/courses.ts` — **only appended** class-band helpers; course records byte-identical to Phase 5
- `app/globals.css` — 4 scoped lines for the class tiles
- `app/courses/[id]/page.tsx` — label "Fee" → "Course Fee" only
- `README.md`, this changelog

Not touched: Home, Faculty, Results, About, Admissions, Contact, FAQ, Blog, header, footer, "Powered by Zenext.ai".

## Motion
Framer Motion (already a dependency) + CSS. Hero/highlight reveals via existing `Reveal`; card stagger capped at 0.24s; active-class pill via `layoutId`; arrow nudge on hover. No layout animation on the grid, no infinite animation on the page. `useReducedMotion` and `motion-safe:` respected.

## Test results
| Check | Result |
|---|---|
| `npm ci` | **Not run** — sandbox had no network (ENOTFOUND) |
| `npm run typecheck` | **Not run** (needs dependencies) |
| Limited type check of changed files with `tsc` + library stubs | **Passed** (does not verify React/Next/Framer/Lucide prop types) |
| `npm run lint` | **Not run** |
| `npm run build` | **Not run** |
| Data check (course records vs. Phase 5, class→course mapping, unique IDs, fee formatting) | **Passed** |
| Browser / responsive / console / reduced-motion / overflow checks | **Not run** (no browser, no dependencies) |

## Run on your PC
```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run dev   # open /courses
```
Then check at 360px, 390px, 768px, 1024px, 1280px+ and landscape phone: no horizontal scroll, tiles tappable, every "View Details" opens the right course, "All courses"/"Show all courses" resets, Class 1–4/6/7 show the enquiry state, DevTools "reduce motion" disables movement. If anything fails, send the terminal output.

## Known notes
- Class selection is held in component state (not the URL), so a filtered view can't be linked directly yet.
- Board/Medium filters hide Entrance and Crash courses by design (those records have no board/medium).
