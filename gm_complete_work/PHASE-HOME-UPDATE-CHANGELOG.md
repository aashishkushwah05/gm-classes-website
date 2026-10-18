# PHASE — Home Page Update

Scope: Home page only (`app/page.tsx`), plus the minimum shared styling required
(`app/globals.css`) and two new, Home-page-specific components. No other route,
including `/about`, `/admissions`, `/blog`, `/courses`, `/faculty`, `/results`,
`/contact`, `/faq`, or the global footer/navbar, was modified.

## Files added
- `components/home/announcement-ticker.tsx` — seamless scrolling announcement strip
- `components/home/stats-section.tsx` — "1,000+ Students / 800+ Families Trust Us" stat block
- `components/ui/count-up.tsx` — dependency-free, IntersectionObserver-based count-up (reduced-motion safe)
- `public/hero-institute-v2.jpg` — new hero photo, cropped from the client's supplied image
- `public/home-sakshi-solanki.jpg` — new Home-page-only photo for Sakshi Solanki's achiever card

## Files modified
- `app/page.tsx` — hero image swapped, ticker inserted, trust strip given real dividers/icon chips,
  Guidance-to-Growth section rebuilt around the director (placeholder removed), Sakshi's achiever
  image path updated, Stats section inserted
- `app/globals.css` — added ticker marquee keyframes + reduced-motion rule (additive only; no
  existing hero/motion rules were changed)

## 1. Animated hero background
Already implemented in the supplied Phase 5 baseline (`gm-hero-grid` / `gm-hero-orb-*` /
`gm-hero-floating-card`, all reduced-motion-safe). No changes were needed here — verified it still
builds and the reduced-motion override still disables the orbs/float/transitions.

## 2. Hero image
Replaced with the image you supplied (`213319.png`), cropped to the hero's near-square frame and
saved as `public/hero-institute-v2.jpg`. The original `hero-institute.jpg` is untouched and still
used elsewhere (none of the other pages reference the hero image, so nothing else was affected).

## 3. Announcement ticker
Added directly under the hero. Pure CSS marquee (two duplicated rows, track slides exactly -50%
for a seamless loop), pauses on hover, and drops the animation entirely under
`prefers-reduced-motion` (showing a static wrapped row instead). Content is five verified facts
only — tagline items already used elsewhere on the site (admissions open, boards/medium, 7-day
demo, competitive exams offered, "since 2019"). No deadlines, seat counts, or offers were invented.

## 4. Trust strip
Kept the same four verified facts and icons. Added visible dividers between items (previously a
`gap-px` trick that wasn't actually rendering a visible line), a subtle icon badge treatment, and a
gentle hover tint on desktop. No wording changed.

## 5. "Right direction today, confident results tomorrow" section
Removed the placeholder entirely — no more silhouette icon, "Student photo", or "Coming soon" text.
Rebuilt as a two-column composition: a larger director portrait in a refined frame with a decorative
ring and a floating name plate, paired with a content panel (the four journey steps as labeled
chips — Concepts → Practice → Assessment → Confidence — plus the existing quote and the verified
teaching-philosophy line). Heading text unchanged. No student photo, testimonial, or story was
invented.

## 6. Sakshi Solanki's Home-page image
Replaced with the image you supplied (`209509.jpg`), cropped and saved as
`public/home-sakshi-solanki.jpg`, used only in `app/page.tsx`'s achievers array. Her name and
achievement text are unchanged. The Results page's own Sakshi photo (`public/results/sakshi-solanki.jpg`)
and the original `public/topper-sakshi.jpg` were left untouched, since you asked for a Home-page-only
change.

## 7. Animated statistics
Added a new, dependency-free `CountUp` component and a Stats section (placed after the Achievers
section, before Admission Process — lower on the page, not crowding the hero, per your instruction).
Counts from 0 to 1,000+ and 0 to 800+ with eased easing, triggers once via IntersectionObserver, and
jumps straight to the final value with no animation when reduced motion is on.
**These two figures (1,000+ Students, 800+ Families Trust Us) were supplied directly in your
instructions for this phase — I used them as given and did not derive or add any other statistic.**

## 8. "Use Your 101%" button
**Not found anywhere in the supplied Phase 5 project** — not in `app/page.tsx`, not in any shared
component. Per your own instruction ("if this button does not exist... do not invent a new CTA
without first telling me"), I have not created one. Please tell me where you expected it (exact
section/wording) or share the version of the page that has it, and I'll upgrade its interaction as
specified.

## Images received but not used this phase
You also sent three app-icon-style logos (WhatsApp, YouTube, Instagram, all on black backgrounds).
Nothing in this phase's instructions asked for social icons to be added to the Home page, and the
footer/global nav are explicitly out of scope this round — so I held off rather than guessing a
placement. If you'd like them on the Home page (and where), or they're meant for the footer's
social links in a future footer-focused phase, let me know.

## Validation
- `npm run typecheck` — **passed**, no errors
- `npm run lint` — **passed**, no warnings or errors
- `npm run build` — **passed**, 46/46 pages generated, including all pre-existing routes
  (`/about`, `/admissions`, `/blog` + 8 posts, `/courses` + 23 detail pages, `/faculty`, `/results`,
  `/contact`, `/faq`)
- Desktop/tablet/mobile inspection: reviewed the modified markup at each breakpoint's Tailwind
  classes (container/grid breakpoints used throughout match the rest of the site's established
  patterns); **an actual rendered-browser pass (screenshots) was not run** in this environment —
  flagging that honestly rather than claiming a visual QA that didn't happen.
- Ticker looping / counter animation / reduced-motion behavior: verified by reading the compiled
  CSS/JS logic, not by watching it run in a browser — same honest caveat as above.
- Console errors: not checked (no live browser session this round).

## Open items needing your input
1. **"Use Your 101%" button** — doesn't exist in this codebase; need its location/exact copy or a
   confirmation to add it as a new CTA.
2. **Social logos** (WhatsApp/YouTube/Instagram) — received, unused; need placement confirmation.
3. Confirm the new hero crop (`hero-institute-v2.jpg`) and Sakshi crop look right to you — both were
   cropped programmatically from your supplied images and not pixel-reviewed by a human.
