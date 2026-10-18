# GM Classes — Results & Toppers Premium Update

Base: merged Home + Courses project. Scope: `/results` only. Other pages, navigation, footer, SEO utilities, dependencies: untouched.

## 1. Visual improvements
- New header "Our Results, Our Pride" with supporting text that makes no numeric claims, plus jump-links to each section (with real counts).
- Class-wise sections generated from data: **Class 9 Toppers**, **Class 10 Toppers**, **Class 12 Achievements**, **Entrance Exam Selections**.
- One card design for all records: fixed 6:7 photo frame (matches the supplied GM-framed photos), class/exam tag below the photo (so it never covers the GM logo inside the photo), name, and a pinned result block:
  - percentage records → "Overall" + large `93%`
  - subject-wise records → "Subject-wise marks" list (no overall % invented)
  - selection records → "Selected" + batch (only where verified)
- Equal-height cards, 1 / 2 / 3 columns, calm gold accent, existing site colours and fonts.
- No ranks, no fake statistics, no first/second/third positions.

## 2. Image loading and motion (updated in the image-lifecycle add-on)
- Space is reserved before load (no layout shift) → soft skeleton → image fades in after it has loaded.
- Cached images that load before hydration are detected, so they never stay hidden.
- Missing or failed photo → branded placeholder (GM logo + "Photo coming soon"), never a broken icon.
- Slow photo: after 12 s the skeleton stops pulsing (no endless loader) and the branded placeholder shows, while the photo keeps loading in the background; if it arrives late it still fades in.
- On load the photo fades in over 700 ms and settles from a 4% scale; the skeleton is removed only after the real load event.
- Loading logic lives in `lib/image-status.ts` (pure reducer), used by `components/results/result-photo.tsx` via `useReducer`.
- Scroll reveal on the card only (one animation per card), tiny stagger capped at 0.24 s, plays once (`viewport.once`), so re-renders don't replay it.
- Desktop hover: small lift + 3% image zoom (hover-capable devices only).
- `prefers-reduced-motion`: no entrance animation, no skeleton pulse, no fade/zoom/lift; all content shows immediately.
- Images use `next/image` with `sizes`; below-the-fold images lazy-load. No new dependency.

## 3. Files
Created: `components/results/result-photo.tsx`, `public/results/photos/<id>.jpg` (10 files)
Modified: `app/results/page.tsx`, `components/results/result-card.tsx`, `lib/results.ts`, `README.md`
Added: this changelog.
Left in place (now unused by Results): older `public/results/*.jpg`. Nothing was deleted.

## 4. Final count and grouping — 11 students
| Section | Students |
|---|---|
| Class 9 Toppers | Pratiya Kag 93%, Atharv Gupta 93%, Kanak Kumrawat 91% |
| Class 10 Toppers | Radhika Sisodiya 91%, Priya Kushwah 87% |
| Class 12 Achievements | Vaishali Sagore (Physics 95/100, Biology 94/100, Chemistry 85/100), Prince Chouhan (Physics 95/100, Maths 83/100), Namrata Sharma (Physics 94/100) |
| Entrance Exam Selections | Sakshi Solanki (ADDET), Ritvi Mandloi (Navodaya Entrance, 2026 Batch), Ansh Yogi (Navodaya Entrance, 2024 Batch) |

## 5. Data discrepancies and how they were handled
1. **Workbook says "Top 10" but has 11 students.** Kanak Kumrawat is a separate extra record. All 11 kept.
2. **Kanak Kumrawat's record is split over two rows** (name in row 15; "class 9", 0.91 and photo in row 16). Merged into one record. His photo was confirmed by you (213708.png matches the workbook photo).
3. **Kanak's 0.91** is a formatted percentage cell → shown as 91%, matching the reference sheet. Lowercase "kanak" / trailing space / "class 9" were tidied in spelling only.
4. **Class labels:** old site used "Class 9th/10th/12th"; the workbook and your list use "Class 9/10/12". Now "Class 9/10/12".
5. **Selection records:** no class or percentage added. Exam text follows the workbook ("Navodaya Entrance — 2026 Batch" → exam + batch).
6. **Photos are in the workbook as in-cell pictures** (`#VALUE!` in normal readers). Mapped by cell position, not by filename or face, then checked visually.
7. **Old site photos differed** from the workbook's GM-framed photos and had none for Pratiya, Namrata or Prince. The page now uses the workbook photos (new files under `public/results/photos/`).
8. **Old "Featured" strip removed:** it repeated three students already shown in their sections.

## 6. Photos missing / not confidently matched
- **Prince Chouhan — no photo supplied** (cell says "INSERT PHOTO"). Branded placeholder shown. To add: save as `public/results/photos/prince-chouhan.jpg` and set `image: "/results/photos/prince-chouhan.jpg"` in `lib/results.ts`.
- All other 10 photos are matched to their rows. Sakshi's results photo differs from the one on Home; Home was not changed.

## 7. Tests actually run
**Image-lifecycle test in real Chromium (Playwright), 30 checks, all passed.** The real `ResultPhoto` + `image-status.ts` were bundled with React 19 and served from a local HTTP server with real image files. Run twice: desktop 1280x800, and Pixel 5 emulation with reduced-motion on.
| Scenario | What was checked | Result |
|---|---|---|
| 1 Photo loads normally | starts as skeleton with photo hidden → on the real load event skeleton removed, photo visible (1160x1355), frame size unchanged | Passed |
| 2 Photo loads slowly (3 s) | skeleton shows; after timeout skeleton stops and placeholder shows; late load still reveals photo and removes placeholder | Passed |
| 3 Invalid path (404) | error state, placeholder shown, no `<img>` left (no broken icon), stays settled, no endless loading | Passed |
| 4 Photo missing (null) | placeholder immediately, no skeleton, no image request | Passed |
| 5 Server-rendered HTML then hydrated, image already complete | detected as loaded, not stuck hidden; no hydration errors | Passed |
| 6 Repeat visit (cached image) | reaches loaded | Passed |
| 7 Mobile emulation + `prefers-reduced-motion: reduce` | same lifecycle works; no horizontal overflow at 393 px; no console/page errors | Passed |
| Negative control | with timeout and error handling deliberately broken the test failed (exit 1), then passed again after restoring | Done |

**Other checks:** data check (11 records, valid IDs/paths/percentages) passed; limited `tsc` with library stubs passed.

**What these tests do NOT prove (not run):**
- The real `next/image` component: a plain `<img>` stand-in with the same `onLoad` / `onError` / `ref` behaviour was used.
- Tailwind output: the test used a few stand-in CSS rules, so the real look (colours, fade timing, shimmer) and the exact frame size under Tailwind's `aspect-[6/7]` are unchecked. The "no layout shift" result is for the stand-in aspect ratio.
- framer-motion scroll-reveal / stagger and `useReducedMotion` at runtime: written and code-reviewed only (`once: true`, delay capped at 0.24 s, `initial={false}` under reduced motion).
- A real phone, and real-device performance on mid-range Android.
- `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build`: sandbox has no network.

## 8. Limitations / manual steps
Run `npm ci && npm run typecheck && npm run lint && npm run build && npm run dev`, then open `/results` at 360, 390, 768, 1024, 1440 px; check no horizontal scroll, photos fade in, DevTools "reduce motion" shows everything instantly, and Prince's card shows the placeholder. Send me any error output.
- With JavaScript disabled, photos stay hidden (same pattern as the rest of the site's reveals).
