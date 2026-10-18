# GM Classes — Part 2 Fix Report

## Changes made

- Refactored `components/ui/use-image-lifecycle.ts` so the callback ref only records the image element. Lifecycle dispatch now happens through effects and actual image events, rather than dispatching state during the ref-attachment phase.
- Added idempotent `load`, `error`, and `reset` reducer transitions in `lib/image-status.ts`.
- Updated `components/results/result-photo.tsx` to use the shared lifecycle hook instead of maintaining a second copy of the old ref-dispatch implementation.
- Updated the Home page achiever cards to show the highest verified Class 10 percentage currently present in the project data (Radhika Sisodiya, 91%), a clearly labelled Class 12 subject achievement (Vaishali Sagore, with subject marks rather than an unsupported overall rank), and Sakshi Solanki's ADDET selection.
- The achiever images use existing name-matched assets in `public/results/photos/` and use `object-contain` to avoid unnecessary cropping.
- Updated `config/site.ts` with the exact user-supplied Google Maps URL: `https://maps.app.goo.gl/pdYaVLHDRvTz69Nm8?g_st=ac`. The existing Home page “Get Directions” link consumes this configuration.
- Preserved existing responsive layouts and ensured the Home achiever cards stack on narrow screens; the project already uses responsive container/grid patterns for Home, Results, Faculty, and Courses.

## Verification performed

- TypeScript/TSX syntax transpilation: 54 source files checked, 0 syntax diagnostics.
- Image reducer checks: load transition, duplicate load idempotence, source reset, error transition, duplicate error idempotence, and missing source — passed.
- Named topper asset path audit for the existing project image paths — passed.

## Not verified

- `npm ci --offline --ignore-scripts` could not complete because a package tarball was not present in the local npm cache (`yocto-queue`). Consequently, the actual project TypeScript check, ESLint run, Next.js production build, and real-browser responsive/runtime tests could not be run in this environment.

## Excel photo limitation

The available `GM_Classes_Top_10_Toppers_Ready_For_Photos.xlsx`, `GM_Classes_Top_10_Toppers_Image_Template.xlsx`, and other available GM Classes workbooks contain **zero embedded images**. The Top 10 workbook has `INSERT PHOTO` placeholders. Therefore, it is not possible to extract the original student photos from those Excel files or prove that current project assets are the exact embedded Excel photos. Existing named photo assets in the website were retained and used where available; no unidentified photographs were guessed or substituted. To complete a strict Excel-photo replacement, provide an Excel workbook with the actual student images embedded or upload the individual original photos with their student names.

## Class 12 data limitation

The available records contain subject-wise marks for Class 12 students, but not verified overall percentages. The Home page therefore presents Vaishali Sagore as a **Class 12 Subject Achievement**, not as an overall-percentage topper.
