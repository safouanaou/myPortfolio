---
name: Safouan Portfolio
description: A cinematic portrait and editorial portfolio for independent design and development.
colors:
  paper: "#f1f0e9"
  ink: "#20221e"
  blue: "#2544eb"
  muted: "#66685e"
  line: "#cdcec4"
typography:
  body:
    fontFamily: '"DM Sans", sans-serif'
  headline:
    fontFamily: '"DM Sans", sans-serif'
    fontSize: "clamp(48px, 6.5vw, 104px)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  emphasis:
    fontFamily: '"Instrument Serif", Georgia, serif'
    fontWeight: 400
spacing:
  page-gutter: "clamp(24px, 5vw, 88px)"
components:
  send-button:
    backgroundColor: "{colors.blue}"
    textColor: "white"
    padding: "18px 22px"
---

# Design System: Safouan Portfolio

## Overview

Experience mode: an illustrated portrait, giant layered typography and cinematic scrolling introduce Safouan’s design and development practice. Warm paper sections provide an editorial rhythm between saturated blue and dark service sections. The composition combines oversized statements, restrained supporting copy and geometric studies.

This documents the implemented source, not a new brand proposal. Selected works are explicitly unbranded placeholders pending real projects.

## Colors

The normative palette comes from `src/styles.css`: blue for the hero, contact action and footer; paper for editorial backgrounds; ink for headings and the services surface; muted for supporting copy; line for dividers. Blue, peach and sage mockup chapter backgrounds distinguish the three visual placeholders. The study gallery repeats these families with darker olive and warm neutral variations.

## Typography

DM Sans supplies navigation, copy, headings and the oversized wordmark. Instrument Serif supplies italic emphasis and the portrait signature. Both are served locally through `src/fonts.css`, with `font-display: swap`: DM Sans weights 400–900 use `public/fonts/font-0.ttf` through `font-5.ttf`; Instrument Serif italic and regular use `font-6.ttf` and `font-7.ttf`.

Headings use tight tracking and fluid sizes; section overrides preserve their individual compositions. Supporting paragraphs use a 1.6 line height. Large hero and finale type is part of the layout and must be checked at narrow widths whenever wording changes.

## Layout

The sequence is portrait hero → editorial statement → expanding SVG composition → selected-work chapters → split about section with anchored portrait → service disclosures → four-step process → geometric study gallery → typography finale → contact → giant wordmark footer.

Desktop sections use generous gutters and whitespace, with two-column about and contact layouts. The process uses a centered sticky stage and an absolutely positioned, overlapping horizontal deck. The gallery has six columns. At 760px and below, the gutter becomes 24px, primary splits stack, the gallery becomes three columns, navigation becomes a menu, and work chapters flow vertically. The process deck follows each arriving card horizontally and remains swipeable afterward. Additional adjustments occur at 1000px and 1600px. Desktop chapter animation begins at 761px.

## Elevation & Depth

Depth comes mainly from portrait/type overlap, clipping, sticky scenes, contrasting surfaces and moving layers. The mobile navigation has a diffuse shadow. The expanding composition uses a dark gradient scrim to keep its final white text readable. Avoid adding generic raised cards to the editorial sections.

## Shapes

Most surfaces and fields have square edges. Circular arrow buttons and disclosure controls, a pill-shaped portfolio status, intersecting ellipse marks and geometric studies provide contrast. The hero contracts to a clipped frame with a 4px radius; the expanding mockup starts at a 4px radius and opens to a full rectangular stage.

## Components

- **Navigation:** anchor links, an accessible mobile menu with Escape handling, and a motion toggle. Preserve the skip link, focus outlines and clear action labels.
- **Hero / GridScan:** a viewport-scale blue composition behind the illustrated portrait and giant type. The decorative, lazy-loaded Three.js grid reacts subtly to pointer position, pauses when offscreen or the document is hidden, and disposes its resources. A failed WebGL initialization leaves the underlying hero visible.
- **ScrollExpand:** window-scroll progress expands the SVG from 30% width / 46% height to the full stage, removes its initial zoom, fades the title and reveals the concluding overlay. Configuration lives at its call site in `src/App.jsx`; behavior and base styles live in `src/ScrollExpand.jsx` and `src/ScrollExpand.css`.
- **Work chapters:** three full-stage SVG mockups slide upward through a pinned desktop sequence. They remain explicitly labeled placeholders.
- **Statement:** a twelve-column composition aligns both headline lines on the left, reserves the rightmost columns for the blue atom, and places the supporting copy on a shared column edge. Mobile keeps the headline full-width and groups the atom alongside the copy below it.
- **Services:** a sticky stage reveals three bundles with an atom traveling along the heading line. A single smoothed scroll playhead synchronizes the atom and text; the first arrival lands at the heading height. Reduced motion shows the bundles in ordinary flow. Preserve the existing package prices.
- **Finale atom:** a fixed decorative layer travels from the playground through the study rows and finale words, then lands in the footer wordmark's O slot and matches the footer text color. Tiles are assigned a fixed side from their resting layout and move together with an 8px clearance around the atom. Row and word geometry is cached on refresh to avoid per-frame layout measurements and side switching. Both tiles and finale words ease open over an approach distance of at least 180px (28% of the viewport height), hold their opening during passage, then ease closed over the same distance. Reverse scrolling restores the original O. Reduced motion hides the moving layer, keeps the original O, and restores all tile positions.
- **Process:** oversized centered DM Sans introduction with Instrument Serif emphasis, revealed and removed through clipped vertical movement without fading. A scrubbed GSAP timeline brings Discover, Shape, Build and Launch upward in order into a gently rotated paper deck. The illustrations in `public/images/process/` are the four original PNGs supplied by the user, matched by filename. Each card contains its supplied title and description. Reduced motion removes the sticky scroll sequence and presents the introduction above the accessible deck.
- **Contact:** labeled, browser-validated fields and a blue action button create a draft in the visitor’s email application. There is no server submission or automatic sending.
- **Scroll pacing:** wheel and trackpad scrolling eases toward a bounded target at no more than 900px/s or 1.1 viewport heights/s, whichever is lower. Input queues are limited to half a viewport (maximum 450px). Keyboard, touch, zoom gestures and nested scrolling remain native; reduced motion disables the custom wheel handling.
- **Motion:** GSAP controls entrance, reveal, hero clipping, desktop chapters and the finale. The system reduced-motion preference or “Motion off” disables these animations, omits GridScan, displays ScrollExpand at its final state, and lays chapters out in normal flow. CSS also disables smooth scrolling and collapses transitions. The in-page choice is session state, not persisted storage.

## Do's and Don'ts

- Do preserve the contrast between expressive display type and calm, readable supporting content.
- Do check desktop, narrow screens, keyboard navigation and reduced motion after layout changes.
- Do keep the illustrated portrait and placeholder status honest and visible.
- Don't invent clients, testimonials, project outcomes or completed work.
- Don't remove the motion fallback or turn contact draft creation into a claim that a message was sent.
