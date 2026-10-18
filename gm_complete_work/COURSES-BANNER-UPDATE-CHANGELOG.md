# Courses Banner Update

Changes made:
- Added eight Classes 1–4, 5, 6 and 7 course offerings for MP Board / CBSE at the requested fees.
- Added the seven provided banner images to `public/courses/` unchanged. Classes 1–4 shares its combined banner across both board offerings.
- Added range-aware class matching so Classes 1–4 offers appear when selecting any class from 1 through 4.
- Kept the existing View Details route and single-source course data; the details page uses each course thumbnail and the same course data.
- Promotional banners use contain sizing in cards to avoid cropping; existing course thumbnails retain their previous cover behavior.
- Updated Vinod Gupta's faculty display title to `Mr. Vinod Gupta Sir`. Apoorva's display title was already `Mrs. Apoorva Sen Ma’am`.

Validation: archive integrity, expected course records, image assets and code edits were checked. A full Next.js build and browser interaction test were not run in this environment.
