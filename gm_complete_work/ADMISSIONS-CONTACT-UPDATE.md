# Admissions and Contact Update

- Tightened Admissions hero vertical spacing to reduce unnecessary blank area.
- Changed Explore GM Classes cards to a restrained black-and-gold treatment with hover accent.
- Added responsive animated contact-form companion panel to use the empty right-hand space.
- Added entrance/hover effects to admission process cards, FAQ cards, contact card and demo CTA; honors reduced-motion preferences.
- Kept the existing Google Maps link from `config/site.ts` (`s.maps`) for the Open in Google Maps button. The embedded map continues to be generated from the configured address (`s.address`), not from a new map URL.
- Added `/api/enquiry` to forward form data to `GOOGLE_SHEETS_WEBHOOK_URL`.
- The actual Google Sheets write will work only after a deployed Google Apps Script Web App URL is configured in the hosting environment. No webhook URL was present in the source ZIP, so live sheet storage cannot be confirmed yet.
- Form attempts the save and then opens WhatsApp; if save fails, it displays a warning rather than claiming the enquiry was saved.
- Course options still come from the existing local `lib/courses.ts` list and are filtered by selected class; no external API was added to load them.
