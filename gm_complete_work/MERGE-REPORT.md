# MERGE-REPORT — Home (ZIP A) + Courses (ZIP B)

Baseline: `GM-Coaching-Premium-UI-Motion-Phase5.zip`
ZIP A (Home): `GM-Coaching-Phase5-HomeUpdate.zip`
ZIP B (Courses): `GM-Coaching-Premium-UI-Motion-Courses-Update.zip`

Method: all three extracted to separate folders and compared file by file (`diff -rq`). Only one file was changed by both ZIPs. Nothing was reformatted, upgraded or rewritten.

## Source of each change
**From ZIP A (Home)** — copied unchanged (byte-identical, verified with `cmp`):
- `app/page.tsx` — Home page update
- `components/home/announcement-ticker.tsx` (new)
- `components/home/stats-section.tsx` (new)
- `components/ui/count-up.tsx` (new, used only by the Home stats section)
- `public/hero-institute-v2.jpg` (new), `public/home-sakshi-solanki.jpg` (new) — images used by Home
- `PHASE-HOME-UPDATE-CHANGELOG.md`

**From ZIP B (Courses)** — copied unchanged (byte-identical, verified with `cmp`):
- `app/courses/page.tsx` — Courses listing page
- `app/courses/[id]/page.tsx` — only the "Fee" → "Course Fee" label (part of the Courses update)
- `components/courses/courses-explorer.tsx`, `course-card.tsx` (changed)
- `components/courses/class-selector.tsx`, `admission-highlights.tsx` (new)
- `lib/courses.ts` — class-band helpers appended; all 23 course records unchanged
- `README.md` — short pointer line to the Courses changelog
- `PHASE-COURSES-PREMIUM-UPDATE-CHANGELOG.md`

**Merged (shared file)**
- `app/globals.css` — see below.

**Unchanged from baseline** (verified identical): all other pages, `app/layout.tsx`, `config/`, `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, all other components and assets, header/footer, "Powered by Zenext.ai".

## Shared-file conflicts
| File | ZIP A change | ZIP B change | Resolution |
|---|---|---|---|
| `app/globals.css` | +12 lines after the Phase 3 block: Home ticker keyframes (`.gm-ticker-*`) | +5 lines at end of file: Courses tile rule (`.gm-class-tile`) | Both are pure additions in different places with different class names. 3-way merge (`git merge-file`, base = Phase 5) ran with **0 conflicts**. Diff of merged vs baseline shows exactly those two additions and nothing else. |

No other overlaps. `package.json` and the lockfile are identical in all three ZIPs, so no dependency work was needed.

## Cross-checks done
- Home page does not import course data; Courses changes to `lib/courses.ts` are append-only, so Home is unaffected.
- All image paths used by Home files exist in `public/`.
- `.gm-class-tile` (Courses) and `.gm-ticker-*` (Home) class names do not collide.
- Course data check: 23 records identical to baseline, IDs unique, each course maps to exactly one class selection.

## Validation results
| Check | Result |
|---|---|
| File comparison A / B / baseline | Done |
| Home files identical to ZIP A; Courses files identical to ZIP B | Passed |
| Non-Home, non-Courses files identical to baseline | Passed |
| globals.css 3-way merge | Passed, 0 conflicts |
| Limited type check (global `tsc` + stubs for react/next/lucide/framer-motion) on Home + Courses files | Passed — does **not** verify library prop types |
| `npm ci` | **Not run** — sandbox has no network (ENOTFOUND) |
| `npm run typecheck` | **Not run** |
| `npm run lint` | **Not run** |
| `npm run build` | **Not run** |
| Browser check of Home, Courses and other pages/navigation | **Not run** |

Note: the same checks were also not run on ZIP A or ZIP B individually in this environment, so build status of the merged project is **unverified**. Please run on your PC:
```bash
npm ci && npm run typecheck && npm run lint && npm run build && npm run dev
```
Then open `/`, `/courses`, one `/courses/<id>` page, and one page each from About, Faculty, Results, Admissions, Contact, FAQ, Blog. If anything fails, send the terminal output.
