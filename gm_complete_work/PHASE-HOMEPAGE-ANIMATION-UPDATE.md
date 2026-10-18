# Homepage Animation & Interaction Update

## Changes
- Removed the text and promotional overlay from the main homepage institute image so the image is displayed cleanly.
- Enhanced homepage programme/feature cards with distinct gold, blue, rose, and green tinted backgrounds.
- Added layered 3D depth, pointer-hover lift/tilt, touch/press feedback, accent-edge reveal, and a light-sweep interaction.
- Kept the existing `Reveal` component's scroll-into-view entrance animation for homepage sections and cards.
- Added an entrance animation for the hero image frame.
- Honoured `prefers-reduced-motion` by disabling non-essential motion when the visitor requests reduced motion.
- Confirmed the shared `SiteShell` renders `FloatingActions`, so the WhatsApp, chatbot, and call buttons remain present globally across pages.

## Validation
- Reviewed the modified JSX structure and CSS.
- A full production build was not run because `node_modules` is not present in this workspace.
