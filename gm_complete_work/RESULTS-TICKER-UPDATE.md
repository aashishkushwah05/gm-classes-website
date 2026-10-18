# Results Ticker Update
- Replaced the static Results Highlights row with a continuous, horizontally scrolling results ticker.
- Ticker pulls student names and class/percentage or subject-wise marks directly from `lib/results.ts`; selection records display name, exam, and selection status.
- Duplicate track creates a seamless loop. Hover pauses movement; reduced-motion preferences disable animation.
- Homepage announcement ticker and unrelated pages/components are unchanged.
- Validation: archive integrity checked after packaging. Full Next.js production build was not run as part of this focused ticker change.
