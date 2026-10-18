# GM Classes update — 14 October 2026

## Changes made in this pass
- Study Material Hub heading now uses a stronger black-to-gold gradient in light mode and a high-contrast light-gold treatment in dark mode.
- Results cards now prioritize only the first three images and lazy-load the rest to avoid requesting every topper image at once. Local result photos bypass Next image optimization to reduce local image-processing overhead.
- Reduced entrance-animation durations and stagger delays on results/faculty cards and featured faculty panels, plus the navbar intro animation, to make navigation feel less sluggish while retaining subtle motion.
- Homepage founder/director portraits use `object-contain` instead of `object-cover` so the supplied full photos are not cropped by the frame.

## Existing project data preserved
- Results image paths in `lib/results.ts` were checked against the included `public/results/photos/` files; all non-null result image paths currently referenced by the data exist in the ZIP.
- Founder and Director already have separate featured profiles on the Faculty page. The project currently identifies the founder as Vinod Kumar Gupta (V.K. Gupta Sir) and the director as Apoorva Sen.
- No separate image/profile for a person named “Vinod Bhatta Sir” was present in the current ZIP. No new identity or photo was invented. Supply the correct photo/details if this is a different person from V.K. Gupta Sir.

## Verification status
- ZIP archive integrity checked after packaging.
- Full Next.js build could not be run in this environment because `next` was unavailable in the partially installed `node_modules`; `npm ci` did not complete in the available time. Run `npm ci` and `npm run build` locally to verify the complete app.
