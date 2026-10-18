# Study Material Hub Update — 2026-10-14

## Changes made
- Added the supplied study illustration at `public/study-material/study-hero.jpg` and used it as the Study Material landing hero background with layered overlays for text contrast.
- Removed the Sparkles/Gemini-like icon beside “GM Classes · Learning Library”. Removed the tiny statistic cards (`05 School classes`, `06 Resource types`, `01 Learning hub`) and replaced them with one larger, cleaner learning-library callout.
- Refined class and entrance-exam cards with responsive spacing, subject previews, and Framer Motion entrance/hover effects.
- Changed class selection from expanding content in-place to navigation to dedicated pages: `/study-material/class-8` through `/study-material/class-12`.
- Added a separate `/study-material/entrance-exams` page.
- Added individual subject/course pages under each class or entrance pathway, with the six requested resource categories marked “Coming soon”. No PDFs or actual study materials were fabricated.
- No Class 5/6/7 cards were added. No homepage, course, chatbot, or Google Sheets source files were intentionally edited.

## Validation / limitations
- Reviewed the Study Material page and route structure for navigation and loading-state issues.
- Framer Motion entry animations use finite initial-to-visible transitions; the hero background is decorative and text sits on a translucent panel/gradient for readability.
- A full Next.js build/typecheck could not be completed in this environment because `npm ci` timed out before dependencies installed. The ZIP therefore should be build-tested locally with `npm ci` and `npm run build` before deployment.
