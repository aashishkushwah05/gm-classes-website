# GM Coaching Website — Phase 1 + 2A + 2B

Current complete public-facing foundation and homepage build using the supplied GM logo and black/gold visual system.

## Included
- Phase 1 foundation and reusable architecture
- Phase 2A: hero, stats, Why GM, courses, results, faculty
- Phase 2B: methodology, batches, testimonials, gallery, FAQ, map/location, final CTA
- Supplied logo at `public/gm-logo.jpg`

## Run
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Validation
```bash
npm run typecheck
npm run lint
npm run build
```

## Intentionally not included
Admin, database, student login, parent login, CMS and lead CRM. These remain future phases.

## Before production
Replace demo course data, fees, results, faculty, testimonials, phone, email, address and dates with verified client information.


## Header Foundation — Locked

The shared header is now implemented for every public page through `SiteShell`.

- Sticky premium black/gold header
- Entrance animation
- Scroll-aware glass/backdrop treatment
- Animated active-route indicator
- Hover underline animation
- Logo micro-interaction
- Desktop navigation
- Responsive mobile drawer with staggered entrance
- English / हिंदी toggle UI
- Contact action
- Enquire CTA
- Reduced-motion friendly behavior

The actual page content should now be designed page-by-page without changing the global header unless a deliberate design decision is made.

## Blog B1 — Foundation

- Added `/blog` listing page.
- Added `lib/blog.ts` with verified topic briefs; these are intentionally marked `planned` and are not presented as published articles.
- Added search and category filtering in `components/blog/blog-explorer.tsx`.
- Added Blog to the primary navigation and sitemap.
- Blog article detail routes are intentionally deferred to Blog B2.
- Gallery and chatbot remain out of scope for this phase.

## Blog B2 — Article System

- Added dynamic `/blog/[slug]` article pages for all published editorial posts.
- Added per-article SEO metadata and Article JSON-LD.
- Added related articles and previous/next navigation.
- Added share/copy-link controls.
- Blog listing cards now link to live article pages.
- Sitemap now includes published article URLs.
- No chatbot, Gallery, About, or Admissions routes were added in this phase.

### Verification note
The project snapshot contains the expected source changes. Local `npm run typecheck` could not complete in this environment because the extracted dependency tree is missing TypeScript type-definition packages (`estree`, `json-schema`, `json5`, `node`, `react`, `react-dom`). No successful build is claimed from this environment.


## Premium UI & Motion — Phase 3

Inner pages receive a shared warm editorial hero treatment, refined card and form interactions, responsive spacing, and reduced-motion-aware polish. See `PHASE-3-CHANGELOG.md`.

## Phase 4 — Responsive & Touch Experience

Phase 4 adds a mobile-first finishing layer for compact screens, short landscape viewports, mobile navigation scrolling, touch interactions, overflow prevention, and responsive spacing. See `PHASE-4-CHANGELOG.md` for scope and validation status.

## Phase 5 — Final QA & Production Polish

Phase 5 provides a clean project archive and a practical final verification checklist. It does not claim that typecheck, lint, production build, or real-browser/device checks have passed in the packaging environment. See `PHASE-5-CHANGELOG.md` and run the validation commands there on the target PC before deployment.

## Courses Page Premium Update
Courses page redesigned with Class 1–12 discovery, redesigned cards, clear fee presentation and highlighted registration / installment / early-seat details. See `PHASE-COURSES-PREMIUM-UPDATE-CHANGELOG.md` (includes which checks were and were not run).

## Results Page Premium Update
Class-wise results, GM-framed photos with loading animation and branded fallback. See `PHASE-RESULTS-PREMIUM-UPDATE-CHANGELOG.md`. To add a student, edit `lib/results.ts` and add the photo under `public/results/photos/`.

## Faculty Page Update
Complete (uncropped) faculty photos, side-by-side director profile with slide-in animation, new photo-loading lifecycle. See `PHASE-FACULTY-PREMIUM-UPDATE-CHANGELOG.md`.

## About + Student Testimonials Update
Redesigned About page and a Student Testimonials section that shows genuine data only. See `PHASE-ABOUT-TESTIMONIALS-CHANGELOG.md`. To add a real review, edit `lib/testimonials.ts` (`verifiedTestimonials`).
