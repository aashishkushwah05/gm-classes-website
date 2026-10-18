# GM Classes — Faculty Page Update (full photos, side-by-side director profile, entrance animation)

Scope: `/faculty` only. Other pages, navigation, SEO and the page's JSON-LD (`ItemList` of `Person`) are unchanged.

## Root cause of the cropping
- Every faculty photo is a **square** file (600×600; the director's is 1024×944).
- `components/faculty/faculty-card.tsx` forced a **4:5** frame with `object-cover object-top` → the sides of each square photo were cut off.
- The director's frame used `sm:aspect-auto sm:h-full`, so its height came from the text column and `object-cover` cropped it by a different amount again.
- A hover `scale-[1.03]` on the image cropped a little more.

## Fix (underlying cause, not an override)
- Each record in `lib/faculty.ts` now carries the photo's real `imageWidth` / `imageHeight` (verified equal to the files).
- New `FacultyPhoto` sizes its frame from those numbers (`aspect-ratio` = the photo's own ratio) and uses `object-contain`, so the **whole photo** shows, undistorted, with no bars. No hover zoom, no transform on the image.
- Photos themselves are not edited; faces untouched.

## Director profile — desktop/tablet (≥768px)
- **Left ~40%:** complete photo in a framed panel, centred. **Right ~60%:** Director tag, name, designation, subjects, qualification, experience, teaching-philosophy quote (all from existing verified data; nothing added).
- Stacks vertically only below 768px, photo first, still uncropped.

## Entrance animation (framer-motion, already in the project; plays once)
1. Card reveals (fade + up, 600 ms)
2. Photo fades up (700 ms, +120 ms)
3. Introduction **slides in from the RIGHT** (x 56 px → 0, fade, 700 ms, +260 ms)
4. Name fades up last (600 ms, +400 ms)
On phones (stacked) the introduction rises instead of sliding sideways. Under `prefers-reduced-motion` nothing moves or hides.
Grid cards: fade-up once with a stagger capped at 0.24 s.

## Photo loading (reuses `lib/image-status.ts`, new hook `components/ui/use-image-lifecycle.ts`)
Skeleton → real load event → fade-in. Missing/invalid/failed → GM-logo placeholder, never a broken icon, never another person's photo. After 12 s the skeleton stops (never endless); a late load still fades in. Entrance animation (on wrapper) and load fade (on image) are on separate elements, so they do not conflict.

## Grid
"Our Teaching Team": 7 cards, complete square photo on top, details below; 1 / 2 / 3 / 4 columns (mobile / ≥640 / ≥1024 / ≥1280). Equal card widths; an incomplete last row is centred. Subjects shown as chips; experience, qualification and quotes only where they already existed.

## Files
Created: `components/faculty/faculty-photo.tsx`, `components/faculty/faculty-featured.tsx`, `components/ui/use-image-lifecycle.ts`, `public/faculty/cleaned/*.png` (4), `tools/clean-faculty-photos.py`
Modified: `components/faculty/faculty-card.tsx` (rewritten), `app/faculty/page.tsx`, `lib/faculty.ts` (added two size fields per record), `README.md`
Reused unchanged: `lib/image-status.ts`. Not touched: Results, Home, About, Courses, header/footer.

## Tests actually run
Real Chromium (Playwright) with the real component code and React 19, served from a local HTTP server using the real photo files; 5 viewports (1280, 768, 767, Pixel 5 393, Pixel 5 + reduced motion): **92/92 checks passed**.
- Photo lifecycle: skeleton first; real load reveals photo; slow photo (3 s) → skeleton stops then late fade-in; invalid path and missing photo → branded fallback; server-rendered + hydrated photo not stuck hidden.
- **Complete photo:** all 8 real photos, at 220 / 300 / 460 px frame widths, fill their frame exactly (frame ratio = file ratio, nothing cropped, no bars).
- Director animation props: slide-from-right (x offset) at ≥768 px; rises (y) at 767 px and on phones; all initial states off under reduced motion; sequence delays 0 → 0.12 → 0.26 → 0.40 s; durations 600–700 ms; grid stagger capped at 0.24 s.
- Hydration without errors; no console/page errors; no horizontal overflow in the harness.
- Control: reintroducing the old 4:5 frame made the no-crop test fail (exit 1); restored → passes.
- Data check: stored image sizes equal the real files. Limited `tsc` with library stubs: passed.

## NOT tested (be aware)
- `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build` — sandbox has no network.
- The real **framer-motion** animation was not rendered: it is not installed here, so a stand-in recorded the animation props. The test proves what is animated and in which direction, not how the motion looks.
- The real **Tailwind layout** (the 40/60 two-column grid, spacing, card look) and real `next/image`: not rendered; side-by-side is implemented with `md:grid-cols-[2fr_3fr]` and reviewed in code only.
- A real phone or mid-range Android.
Please run `npm ci && npm run typecheck && npm run lint && npm run build && npm run dev` and open `/faculty` at ~1280, 768 and 390 px.

## Photo fragment cleanup (follow-up)

**Cause:** the leftover text ("a", "pal", …) is **inside the image pixels** of the supplied files. It is not caused by CSS or layout (the files show it when opened on their own).
**Clean originals:** none exist in the project or in any of the original ZIPs (searched every image file; only the 8 faculty files + director.jpg exist). The unused `public/faculty/vk-gupta-card.jpg` also has fragments ("a Sir") but is not shown anywhere.

All 8 faculty files were inspected at full size, including left/right edge strips.

| Photo | Finding | Action |
|---|---|---|
| Apoorva Sen | green "a" (and edge of a "v") at left | **Corrected** (cleaned copy) |
| Krishna Gopal Mandloi | brown "pal" at left, the "l" partly behind his ear | **Corrected** (cleaned copy) |
| Hemlata Yadav | maroon "a" at left + thin letter sliver at the left edge | **Corrected** (cleaned copy). The large brown block behind her shoulder is a design shape and was kept. |
| Shivani Sen | thin maroon sliver at the left edge | **Corrected** (cleaned copy) |
| Mithun Chouhan | no text fragments | unchanged |
| Ganesh Parmar | no text fragments (a cut-off chemistry doodle "H3C" is part of the artwork) | unchanged |
| Kratika Yadav | no text fragments. A very faint ghost face sits at the top-right of the artwork. It is not text, and nothing was changed. | unchanged — see note |
| Director (director.jpg) | clean | unchanged |

**How:** `tools/clean-faculty-photos.py` replaces only the leftover-text pixels with the surrounding plain background, inside small per-image boxes on the left edge. Cleaned copies are saved as lossless PNG in `public/faculty/cleaned/`; **the original JPEGs are untouched** in `public/faculty/`. `lib/faculty.ts` now points four records at the cleaned copies; switching back is a one-line change per teacher.

**What changed in each cleaned image (measured):** Apoorva 1.98 % of pixels, Krishna 2.57 %, Hemlata 1.34 %, Shivani 0.15 %. Every other pixel is **byte-identical** to the original, so faces, hair, ears, clothing and the design blocks are unchanged (0 changed pixels outside the text areas, 0 in protected skin/hair zones). Krishna's ear and Hemlata's dupatta edge were checked at 9x/3x.

**These are provisional.** They are background retouches, not true originals. Clean originals of these four photographs (without the old card text) are still the preferred fix and would replace the cleaned copies.

**Tests run for this follow-up**
- Visual inspection of all 8 originals (full size + edge strips) and of before/after zooms of every changed area; final edge strips of the 7 grid photos as served: no text fragments. An automatic scan for small dark ink shapes touching the edges found only Shivani's saree border (clothing, checked by eye).
- Pixel-diff check per cleaned image (numbers above).
- Real-Chromium test suite re-run against the exact files the site serves, including the cleaned PNGs: **92/92 checks passed** (all 8 photos still fill their frame exactly: no crop, no stretch).
- Image sizes in `lib/faculty.ts` equal the real files; limited `tsc` with library stubs passed.

**Not tested / limits:** `npm ci`, typecheck, lint, build (no network); the real Tailwind layout and framer-motion rendering; a real phone. The cleaned PNGs are about 300–380 KB each as sources (Next.js serves smaller optimised versions).
