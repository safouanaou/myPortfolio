# Bar César

A responsive Dutch-language restaurant concept based on `writing-block.md`.

## Run

Requires Node.js; there are no packages to install.

```sh
npm run dev
```

Open http://localhost:5173. `npm run build` creates the static deployable site in `dist/`. `npm run check` validates JavaScript syntax.

## Design and functionality

- Full-screen photographic hero, slow crossfades, pause control, and illustrated coffee mascot.
- Rounded green chapter transition and keyboard-accessible category explorer.
- Six-dish sticky desktop sequence with previous/next controls; stacked dishes on mobile and for reduced motion.
- Categorized menu dialog, editorial reviews, story, gallery, and visit information.
- Four-step validated enquiry with preserved answers, safe summary rendering, and restart. It does not send, save, or book anything.
- Mobile route, demo call, and menu actions; native dialog keyboard/focus behavior.

## Content

This is a design concept. Prices, opening hours, reviews, contact details, descriptions, and story copy are illustrative, as authorized in the brief discussion. Phone and social actions explain the concept status. No backend or real reservations are connected. Three missing dish photographs use original SVG illustrations; the supplied interior photo stands in for an owner portrait.

The six `image N.png` files supplied in the workspace were converted into smaller JPEGs in `assets/`. Original files were preserved. Screenshots were not used as website assets. Google Fonts provides Barlow Condensed, Fraunces, and DM Sans, with local fallback stacks.

Business-location reference: https://hipsteadresjes.gent/nieuw/bar-cesar/
Brand-context reference: https://www.debarbaren.be/projecten/bar-cesar

## Verification

JavaScript syntax and static build passed. Browser checks covered desktop and mobile layouts, horizontal overflow, image loading, category menus, numbered gallery navigation, review navigation, the full demo enquiry, and absence of console errors. Reduced-motion alternatives are implemented through CSS and media-query-aware JavaScript.

## Concept 02 — Azure-inspired motion

Branch: `codex/concept-02-azure-motion`. The original concept is saved on `main` at `286ffe4`.

Motion reference: https://azure.sa/ (inspected live). This version adapts the rounded panel rising over a pinned hero, oversized decorative curves, staged chapter entrances, progressive text coloring, and layered full-screen editorial gallery into César's palette and typography.

`concept-two.css` contains the second concept's visual direction; `motion.js` coordinates native-scroll transforms, reveal masks, the word-color sequence, and the six pre-rendered dish layers. No scroll interception or smooth-scroll dependency is used. The gallery shares the original menu data and controls. At mobile widths the long pinned scenes become ordinary stacked content. Reduced-motion preferences remove sticky scrubbing, automatic hero transitions, and reveal dependencies.

Images, menu content, and the demo-only enquiry from concept 01 are retained. Build output includes both concept files.
