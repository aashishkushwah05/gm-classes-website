# GM Classes — Premium UI & Motion Phase 5

## Scope
Final QA handoff and production-readiness checklist, based on Phase 4. This phase does not introduce new UI dependencies or fabricate institute content.

## Package hygiene
- Removed an accidentally nested copy of the project from the Phase 4 archive.
- Removed generated `.next` output and `node_modules` from the deliverable.
- Preserved the existing application source, assets, lockfile, routes, and feature flows.

## Required validation on the target PC
The environment's dependency installation did not complete within its execution window, so no successful TypeScript, ESLint, production build, or browser test is claimed. Run:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run dev
```

If `npm ci` fails, share the complete terminal output before attempting dependency upgrades or `npm audit fix --force`.

## Manual QA checklist
- [ ] Home page at 360px, 390px, 768px, 1024px, and desktop widths
- [ ] Mobile menu: portrait, landscape, keyboard open/close, focus visibility
- [ ] Course listing and a course detail route
- [ ] Faculty and results pages; images preserve their composition
- [ ] About and Admissions pages
- [ ] Contact form validation and WhatsApp handoff (do not claim backend submission)
- [ ] FAQ search, category filters, and accordion keyboard interaction
- [ ] Blog listing, search/filter, and an article route
- [ ] Footer branding and navigation links
- [ ] Reduced-motion preference
- [ ] Browser console: no runtime errors or failed local assets
- [ ] Production build and production server smoke test

## Honest status
This is a clean QA handoff package, not a claim that all checks have passed. Production readiness is confirmed only after the automated checks and manual checklist above are completed on the target PC.
