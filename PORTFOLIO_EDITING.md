# Editing the portfolio

## Delivery preference

After each completed change, validate it, commit and push to the existing GitHub repository, then deploy the validated build to the existing Cloudflare Worker with `npm run deploy`. The production domains are `www.safouanaouezghar.com` and `safouanaouezghar.com`, configured in `wrangler.jsonc`. Verify the published assets after deployment. This is the owner's standing instruction; do not request routine publishing confirmation again.

The page is composed in `src/App.jsx`; visual rules are in `src/styles.css`. See `DESIGN.md` for the current design system. The first selected work is Bar César, a restaurant website concept supplied by Safouan. The other two selected-work entries remain placeholders. Do not fabricate clients, testimonials, results or case studies.

## Replace selected-work mockups

The `mockups` array in `src/App.jsx` defines the three chapters: `name`, `type`, `file`, `theme` and `copy`. Bar César uses `public/projects/bar-cesar.jpg`, sourced from its repository, and opens `/projects/bar-cesar/index.html`. The local `BarCesar/` source is copied into the public project route by `scripts/sync-projects.mjs` before development and production builds. Its README identifies it as a concept, not a live client commission. Optional `image`, `alt`, and `url` fields distinguish real project entries from placeholder SVGs. The counter uses the array length.

1. Add approved project imagery under `public/` without overwriting the user’s source assets. For another format, update the image source expression as well as the data; changing `file` alone will still append `.svg`.
2. Update the corresponding title, category, description and meaningful image alt text using supplied facts only. Keep placeholder labels on every item that remains a mockup.
3. Update the heading’s “Portfolio in progress” explanation and the hardcoded “Project placeholder” labels only when accurate. The image alt text currently also explicitly says it is a placeholder.
4. If changing the number of chapters, update the hardcoded `/ 03` counter and review `.chapters` height plus the GSAP pinned timeline. Verify both animated desktop chapters and normal mobile/reduced-motion flow.
5. Review the separate `ScrollExpand` call: it also uses `/mockups/web.svg`. Its expanding crop uses `object-fit: cover`; selected-work images use `object-fit: contain`. Choose composition-safe imagery for each use and update their alt text independently.

## Portrait, copy and services

The hero and about section share `public/portrait.png`. If an approved replacement is supplied, update both image dimensions and alt descriptions, then inspect the hero overlap and about crop. Keep the original asset available.

Edit process content in `processSteps` and package content in `serviceBundles`. Preserve the user’s current starting prices: Essential Presence **€750**, Signature Experience **€1,500**, Complete Brand Presence **€2,500**. Their displayed timelines are 2–3 weeks, 4–6 weeks and “To be scoped.” Do not change these commercial terms without user direction.

The geometric gallery is a visual study collection generated in JSX, not a client portfolio. Biography, languages, location and contact details are in `App.jsx`; change them only from confirmed information.

## Contact behavior

`contact(event)` prevents browser submission and constructs an encoded `mailto:` draft to `aouezgharsafouan@gmail.com` with name, email and project details. The visitor must review and send it through their configured email application. The website has no contact backend and cannot verify that a draft opened or that a message was sent. The direct email link offers the same recipient without form details.

If the address changes, update both the handler and visible email link. Keep draft behavior clear in the form note. A future server-backed form would need a real endpoint and success/error handling before displaying delivery claims.

## Motion and verification

`src/App.jsx` owns GSAP scenes and the combined system/user reduced-motion state. `src/ScrollExpand.jsx` owns expansion progress; `src/GridScan.jsx` owns the decorative WebGL shader and resource lifecycle. Preserve the `enabled`/reduced-motion wiring and cleanup behavior.

After content edits, check heading wraps, portrait crops, chapter counters, direct anchor navigation, mobile menu open/close/Escape behavior, service keyboard disclosures and contact field validation. Review with motion on, the in-page toggle off and the operating-system reduced-motion preference. Confirm the static work chapters remain readable and no content relies on animation to become available. The parent implementation task handles runtime verification; these documents do not claim additional tests were run.
